---
name: lrc-align
description: LRC歌詞のタイムスタンプを音源(mp3)に合わせて修正する。Use when LRCのずれ・歌詞表示の遅れ・早さを直したいとき、歌詞同期(karaoke表示)のタイミングを合わせたいとき、ユーザー提供のタイムスタンプと音源が合致しているか確認したいとき。ユーザーが「LRCがずれている」「歌詞のタイミングがおかしい」と言ったら必ずこのスキルを使う。タイムスタンプを体感でずらすのではなく、必ず音源を実測して合わせる。
---

# LRCタイムスタンプの実測による修正

`features/music` の再生プレイヤーは `public/audio/<track>.lrc` をパースして
歌詞を表示する。このスキルは、LRCのタイムスタンプを音源に実測で合わせる手順を定める。

## 前提知識(入口の判断)

- **ユーザー提供のタイムスタンプは音源と一致しない可能性が高い**。生成サービスの
  メタデータや別マスタ向けの値、歌詞カード由来の値が紛れ込む。まず実測で検証する。
- **ずれは定数オフセットとは限らない**。音源の構成(導入・間奏ブリッジ・コーラスの
  くり返し)とLRCの想定が違うと、ずれが曲中で拡大する。冒頭だけ直して残りが
  直るか確認するより、全行の実測が確実で速い。
- パーサーは `src/lib/lrc.ts`。`[mm:ss.xx]`(2桁)と `[mm:ss.xxx]`(3桁)に対応。
- プレイヤーは `features/music/Player.tsx`。表示側にバグがあると仮定する前に、
  ほぼ常にLRCの側が原因。
- dev限定のデバッグUI(LRC Editor)は 2026-09 に撤去済み。手動 tapping には
  使えない。
- 音源の把握:`afinfo public/audio/<track>.mp3` で長さを確認。
  ffmpegのRMS/silencedetectでは歌声と楽器を区別できない — **解析に時間を使わず
  直ちにWhisperで実測に移る**こと(楽曲は無音区間がほぼないためRMSは情報量が少ない)。

## 手順

### 1. 準備

- 対象のLRCとmp3を確認:`public/audio/<track>.mp3` と `<track>.lrc`
- 作業用ディレクトリ:`/var/folders/mn/56grcmsn4bb8lk4svs0hgwm80000gn/T/opencode`
- 現行LRCの歌詞テキストだけ保持する(タイムスタンプは参考に留める)。

### 2. 音声をWhisper用に変換

```sh
ffmpeg -y -hide_banner -loglevel error -i public/audio/<track>.mp3 \
  -ar 16000 -ac 1 /var/folders/mn/56grcmsn4bb8lk4svs0hgwm80000gn/T/opencode/<track>.wav
```

結果が正しければ全曲を一度に処理する。冒頭だけ確認したい場合は `-t 30` を付ける。

### 3. ローカルMLX Whisperで文字起こし

録音後処理CLIと同じプロジェクトを使い回す。モデルの初回DL(~1.5GB)は数分かかる。

```python
import mlx_whisper
import soundfile as sf

audio, sr = sf.read("<wav path>", dtype="float32")  # sr == 16000
result = mlx_whisper.transcribe(
    audio,
    path_or_hf_repo="mlx-community/whisper-large-v3-turbo",
    language="en",                      # 歌詞が英語の場合。ja曲なら "ja"
    condition_on_previous_text=False,   # 幻聴の連鎖を防ぐ
    no_speech_threshold=0.6,
    logprob_threshold=-1.0,
    temperature=0.0,
    word_timestamps=True,               # 行の開始 = 最初の単語の start
)
for s in result.get("segments", []):
    for w in s.get("words", []):
        print(f"{w['start']:7.2f} - {w['end']:7.2f}  {w['word']}")
```

実行方法:`uv run --project /Users/gameku/Documents/ghq/recorder/postprocess python <script.py>`

- セグメントだけだと行の結合/分割が雑なので、必ず `word_timestamps=True` を使う。
- `segments` の `start` は信用しない(単語の `start` を使う)。

### 4. 歌詞行と実測時刻のマッピング

- Whisperの出力を歌詞の行と**先頭から順に**対応付ける。誤聴は頻出する
  (`will land` → `flew and` など)が、語順と母音の並びで対判定できれば十分。
- LRCに存在しない音(「Ooh」や即興的なくり返し)は無視する。
- 各行のタイムスタンプ = その行の先頭単語の `start`。
- 2回目以降のコーラスは同じテキストになるため、必ず音声上の順序で対応付ける。

### 5. LRCの書き戻し

- `[ti:<title>][ar:G.A][al:Portfolio]` ヘッダと歌詞テキストは温存する。
- 各行 `[mm:ss.xx]` 形式で出力する。
- 曲の後半に歌詞のない間奏・ブリッジがある場合、最終行がそのまま残って表示される。
  その区間の歌詞が未確定なら放置し、ユーザーに伝える。

### 6. 検証と報告

- `pnpm check` を実行する(LRCは対象外だが、他の変更を伴う場合のため)。
- ユーザーにブラウザでの再生確認を依頼する。確認ポイント:
  1行目の切り替わりタイミング(導入部の前奏分が必要なら数100ミリ秒単位で微調整)
  とコーラス頭。
- Whisperの単語時刻は目安として ±0.2〜0.5秒の誤差があり得る。ユーザーの体感
  (「この行はもう少し早い」)があればそちらを優先して部分修正する。
