// Japanese content (polite business register, です・ます). Mirrors content_en.js.
// Report PDFs stay in English; only their list titles are translated.
const F_JA = t => `<span class="fill">要記入：${t}</span>`;

const REPORT_TJ = {
  "2026-11-16-exit-door-sensor": "出口扉センサーの断続的な不具合に対するプログラムの暫定修正",
  "2026-11-13-guide-screen": "ドライバー向け案内画面の更新",
  "2026-11-04-lot-priority": "リフト1基が停止しても運用を続けられる駐車スペースの優先順位設定",
  "2026-10-19-card-number": "操作が完了しなかった際に残るカード番号の不具合を修正",
  "2026-03-27-robot-overtime-err297": "リフトに荷下ろし指令が残っている間は扉を開けないよう修正（Err297）",
  "2026-03-24-door-safety-sensor": "閉扉中に安全センサーが反応した場合は扉を開いたままにする",
  "2026-02-12-door-after-start": "START押下後に扉が開く不具合を修正",
  "2026-01-29-centering-overtime-er203": "センタリングのオーバータイム設定を調整（ER203）",
  "2026-01-29-centering-overtime-er6-70": "センタリングのオーバータイム設定を調整（ER6・ER70）",
  "2026-01-19-turntable-delay": "ターンテーブルにタイマーディレイを追加",
  "2025-12-16-small-car-centering": "小型車のタイヤ位置チェックと、HMIによるドライバーへの案内",
  "2025-11-06-lot-sequencing": "駐車スペースの選択順序を見直し",
  "2025-10-10-turnover-sequence": "ターンオーバーのシーケンスを修正",
  "2025-09-12-car-wheel-check": "タイヤ位置チェックのエラーを修正",
  "2025-07-14-thermal-overload": "ロボットのサーマルオーバーロード（ER227）に対応するプログラム変更",
  "2025-04-29-reset-sequence": "システムのリセットシーケンスを見直し",
  "2025-04-28-door-not-open": "駐車室の扉が開かない不具合を修正",
  "2025-04-25-fold-expand-sensor": "ロボットの折りたたみ／展開センサーが同時に反応する不具合を修正",
  "2025-04-23-power-drop-timer": "瞬時の電圧低下でエラーが出ないようディレイを追加",
  "2025-04-10-guide-lamp": "誘導灯の調整",
  "2025-03-26-scada-alarm": "制御室の外で警報音を鳴らし、SCADAへアラームを送信",
  "2025-02-04-centering-sensor": "センタリングセンサーの位置と角度を変更"
};

const P_JA = [
{
  id:"siamese", box:[0,0,0,0],
  kicker:"自動駐車場 · PLC・システム連携",
  title:"Siamese LM@GS",
  short:"2基のリフトを備えた自動駐車システムです。制御盤とPLCプログラムから、利用者向けの画面、精算システムとの連携まで担当しました。",
  tags:["Siemens S7-1500","HMI","TCP/IP","Modbus RTU","Commissioning"],
  hero:{src:"assets/siamese_site.webp", pos:"50% 50%", cap:"コミッショニング中、プロジェクトの制御室にて"},
  body:`
  <div class="sec"><h4>担当業務</h4>
    <p>この建物では、2基のリフトが車を格納エリアまで自動で運びます。ドライバーは駐車室に車を入れてカードをタッチし、その場を離れるだけで、あとはシステムがすべて行います。
    私の役割は、制御盤内の電気系統からドライバーが目にする画面まで、すべてを安全に連携させることでした。</p>
    <ul>
      <li><b>制御盤の試験</b> — 機械と接続する前に、電源系と制御系の配線を確認し、I/O信号を試験</li>
      <li><b>PLCプログラミング</b> — リフトのシーケンス、駐車スペースの割り当て、扉の安全インターロック、アラーム</li>
      <li><b>ドライバー向けの表示</b> — 駐車室のHMI、誘導灯、出庫待ちの順番表示</li>
      <li><b>精算機（Pay-on-foot）との連携</b> — POSとPLCがTCP/IPで通信し、カードリーダーがModbus RTU（RS485）でカード番号を送るプロトコルを設計</li>
      <li><b>現地コミッショニング</b> — 実車ですべてのフローを試験し、引き渡し後も改善を継続（例：カード番号の残留防止、リフト1基が停止しても出庫できる駐車順の設定）</li>
    </ul></div>
  <div class="sec"><h4>ご利用の流れ</h4>
    <p class="muted">入庫から出庫まで、ドライバーの利用の流れの概要です</p>
    <div class="fcwrap">
      <div class="fc"><div class="lane">入庫 · 車を預ける</div>
        <div class="n end">駐車室の前まで車を運転</div>
        <div class="n">センサーが車を検知 → 扉が自動で開く</div>
        <div class="n">車を入れてエンジンを切り、車から降りる</div>
        <div class="n dec"><b>タイヤの位置は正しいか？</b><span class="no">いいえ → HMIで車の移動を案内し、再確認</span></div>
        <div class="n">駐車カードを受け取ってパネルにタッチし、CONFIRM → START を押す</div>
        <div class="n dec"><b>室内に人や障害物はないか？</b><span class="no">いいえ → 安全が確認されるまで扉は開いたまま</span></div>
        <div class="n">扉が閉まる → リフトが車を格納</div>
        <div class="n end ok">入庫完了</div>
      </div>
      <div class="fc"><div class="lane">出庫 · 車を受け取る</div>
        <div class="n end">POSまたは自動精算機で料金を支払う</div>
        <div class="n">呼び出しポイントでカードをタッチ</div>
        <div class="n dec"><b>支払い済みの時間内か？</b><span class="no">いいえ → 差額を精算</span></div>
        <div class="n">順番待ちに登録 — 画面に順番を表示</div>
        <div class="n">順番が来る → リフトが車を出庫室まで降ろす</div>
        <div class="n dec"><b>返却されたカードはこの車のものか？</b><span class="no">いいえ → カードを返却し、係員に連絡</span></div>
        <div class="n">扉が開く → 車で退出 → 扉が閉まる</div>
        <div class="n end ok">出庫完了</div>
      </div>
    </div></div>
  <div class="sec"><h4>ギャラリー</h4><div class="gallery">
    <img src="assets/siamese_tower.webp" alt="建設中の駐車棟">
    <img src="assets/siamese_cart.webp" alt="自動駐車システムのカートに載った車">
    <img src="assets/siamese_robot.webp" alt="車両搬送ロボットの据付と点検を行うチーム">
    <img src="assets/siamese_tec1.webp" alt="現地で構造物の作業を行う技術者">
    <img src="assets/siamese_tec2.webp" alt="レールと駐車スペースの構造物を据え付けるチーム">
    <img src="assets/siamese_hmi.webp" alt="Siemens Smart Line のHMI画面">
    <img src="assets/siamese_guide.webp" alt="誘導灯の画面例"></div></div>`
},
{
  id:"dashboard", box:[0,0,0,0],
  kicker:"IoT · システム構成",
  title:"PT-Autopark Dashboard",
  short:"全プロジェクトのPLCデータをリアルタイムで1つのWeb画面に集約する中央監視システムです。新たなハードウェアは必要ありません。",
  tags:["S7-1500","V-box · Lua","MQTT/TLS","Node.js","Socket.io","SQLite","AWS"],
  hero:{src:"assets/dashboard_desk.webp", pos:"50% 50%", cap:"ノートPCにはクラウド側のコード、モニターにはPLCプログラム、紙には着手前に描いたフロー"},
  body:`
  <div class="goal"><b>個人目標</b>全プロジェクトを一か所で把握し、実際の稼働状況から機械の劣化を評価し、使いやすいUX/UIでデータログに簡単にアクセスできるようにすること。</div>
  <div class="sec"><h4>課題</h4>
    <p>これまで各プロジェクトの状態は現地のHMIでしか確認できず、機械にトラブルがあると、電話連絡を待つか現地へ行って確認する必要がありました。そこで、すべてのプロジェクトを1つの画面で確認できるシステムを設計しました。</p></div>
  <div class="sec"><h4>システム構成</h4>
    <div class="arch">
      <div class="col"><small>LAYER 1 · FIELD</small>
        <div class="blk"><b>Siemens S7-1500</b><span>各プロジェクトの既存PLC</span></div>
        <div class="blk ghost"><span>既存のタグのみを読み取り：空き台数、待ち順、リフト／カート／ロボットの状態とエラー、入出庫台数</span></div></div>
      <div class="link"><span>S7comm  ·  現場LAN</span></div>
      <div class="col"><small>LAYER 2 · GATEWAY</small>
        <div class="blk"><b>V-box + Lua script</b><span>1秒ごとにPLCを読み取り → JSONを生成</span></div>
        <div class="blk ghost"><span>スクリプトは1つのテンプレートから生成し、実行時に各サイトのタグを自動検出。サイトを追加してもバックエンドの変更は不要です</span></div></div>
      <div class="link"><span>MQTT over TLS  ·  送信のみ</span></div>
      <div class="col"><small>LAYER 3 · CLOUD</small>
        <div class="blk"><b>MQTT broker</b><span>全サイトからデータを受信</span></div>
        <div class="blk"><b>Node.js / Express</b><span>データ取り込み → SQLite · REST API</span></div>
        <div class="blk"><b>Socket.io</b><span>新しい値を即座にブラウザへ送信</span></div>
        <div class="blk"><b>AI Guide</b><span>アラームを点検手順に変換</span></div></div>
      <div class="link"><span>HTTPS  ·  WebSocket</span></div>
      <div class="col"><small>USERS</small>
        <div class="blk"><b>Web dashboard</b><span>全サイトの概要 · サイト別画面 · エラーログ · 入出庫統計</span></div></div>
    </div></div>
  <div class="sec"><h4>設計方針</h4><ul>
    <li><b>制御ロジックには触れない</b> — 既存タグを読み取るだけなので、機械を止める必要も、稼働中のプログラムを変更する必要もありません</li>
    <li><b>データは一方向のみ</b> — ゲートウェイは送信専用でコマンドを一切受け取らないため、インターネットから機械を操作することはできません</li>
    <li><b>全区間を暗号化</b> — MQTTはTLSで通信し、各ゲートウェイに固有のクライアントIDを割り当てることで、接続の奪い合いによるデータ欠落を防いでいます</li>
    <li><b>不明な値を数値で埋めない</b> — システムが把握していない値は、画面をそれらしく見せるために数値で埋めず、「—」と表示します</li>
    <li><b>AIの回答には出所を明示</b> — すべての提案にAIかルールベースかを表示し、オフラインでも利用できます</li></ul></div>
  <div class="sec"><h4>実際の稼働データから劣化を評価</h4><ul>
    <li><b>入出庫台数</b> — 日・週・月・年ごとの台数から、各機械が実際にどれだけ稼働しているかがわかります</li>
    <li><b>故障履歴</b> — すべてのアラームを継続時間とともに記録するため、繰り返し発生する故障がひと目でわかります</li>
    <li><b>稼働率</b> — 1時間ごとの稼働履歴から、どのサイトで状態が変化し始めたかを把握できます</li>
    <li><b>使いやすいデータログ</b> — サイトと期間で絞り込み、ワンクリックでCSVを出力。現地のHMIを確認する必要はありません</li></ul></div>
  <div class="sec"><h4>私の役割</h4><p>システム全体の構成を設計し、レイヤー1〜2（PLCタグとV-boxゲートウェイ）を自ら構築しました。レイヤー3はAI（Claude Code）が実装し、私は要件定義とレビューを担当しました。</p></div>`
},
{
  id:"travel", box:[0,0,0,0],
  kicker:"自動化の考え方 · AI",
  title:"Travel RBM",
  short:"毎月繰り返していた書類作業を、短いチャット入力だけで済むようにしました。月末には、会社の正式な様式に記入済みの申請書が届きます。",
  tags:["Python","Telegram","Gemini","Azure Functions","Azure SQL"],
  body:`
  <div class="goal"><b>個人目標</b>繰り返し作業に費やす時間のムダをなくすこと。</div>
  <div class="sec"><h4>繰り返し作業に対する私の考え</h4>
    <blockquote class="quote">毎月繰り返す作業は、時間がかかるだけでなく、最もミスが起きやすい作業でもあります。
    ルールが明確な手順はシステムに任せ、人は判断だけに集中するべきだと考えています。</blockquote>
    <p>社員は毎月、交通費の精算書を移動ごとに手で記入し、距離×単価を計算して、ジョブコードごとに分けていました。私は次の4つの考え方で、この課題を解決しました。</p>
    <div class="steps4">
      <div><i>1</i><b>本当の課題を見つける</b><span>課題は書類の記入そのものではなく、1か月分の記録を後から思い出して集めることでした</span></div>
      <div><i>2</i><b>発生した時点で記録する</b><span>移動中に、普段使っている言葉で短いチャットを送るだけ</span></div>
      <div><i>3</i><b>AIは必要な部分だけに使う</b><span>AIはメッセージを「読む」だけ。金額は検証できるコードで計算します</span></div>
      <div><i>4</i><b>信頼される形で出力する</b><span>新しい書類は作らず、会社の正式なExcel様式にそのまま記入します</span></div>
    </div></div>
  <div class="sec"><h4>システム構成</h4>
    <div class="arch">
      <div class="col"><small>INPUT</small>
        <div class="blk"><b>Telegram</b><span>例：「inn office へ、高速代 50」</span></div></div>
      <div class="link"><span>Webhook + シークレットトークン</span></div>
      <div class="col"><small>AZURE FUNCTIONS</small>
        <div class="blk"><b>Access gate</b><span>トークンと利用者のホワイトリストを確認（フェイルクローズ）</span></div>
        <div class="blk"><b>Gemini parser</b><span>タイ語／英語の文章 → 構造化された移動データ</span></div>
        <div class="blk"><b>Confirm</b><span>保存する前にデータを読み返し、利用者が確認</span></div></div>
      <div class="link"><span>保存</span></div>
      <div class="col"><small>DATA & REPORT</small>
        <div class="blk"><b>Azure SQL</b><span>無料枠 · 月額約0バーツ</span></div>
        <div class="blk"><b>Aggregate (code)</b><span>ジョブコードごとに合計 — 計算はAIに任せません</span></div>
        <div class="blk"><b>Excel template</b><span>正式な様式のデータセルに直接書き込み</span></div></div>
      <div class="link"><span>毎月1日、または /report コマンド</span></div>
      <div class="col"><small>OUTPUT</small>
        <div class="blk"><b>記入済みの申請書</b><span>Telegramで返送され、そのまま提出できます</span></div>
        <div class="blk ghost"><span>6時間ごとの監視で、ボットの停止や利用枠の残量不足を通知</span></div></div>
    </div></div>
  <div class="sec"><h4>この取り組みで示せること</h4><ul>
    <li>業務のどの部分にAIが適し、どの部分に100%正確なロジックが必要かを見極める力</li>
    <li>初日からコストゼロとセキュリティを前提にした設計（自動テスト65件、APIキーがログに残らない仕組み）</li>
    <li>アイデアから1日で実運用を開始し、その後も利用者のフィードバックをもとに改善を継続できる実行力</li></ul></div>
  <div class="sec"><h4>私の役割</h4><p>プロダクトオーナーとして、課題の発見、方針の設計、要件定義、テスト、レビューを担当しました。コードの作成とデプロイはAI（Claude Code）が行いました。</p></div>`
},
{
  id:"sumitronic", box:[0,0,0,0],
  kicker:"据付 · コミッショニング",
  title:"Sumitronic",
  short:"電子部品工場で、PCB搬送コンベヤと、顔認証・人体の静電気チェックを行うESDゲートの据付とコミッショニングを担当しました。",
  tags:["Installation","Commissioning","Omron PLC","Interlock","TCP/IP"],
  hero:[{src:"assets/sumi_conv_5.webp", cap:"PCB搬送コンベヤ"},{src:"assets/sumi_esd_2.webp", cap:"ESDゲート"}],
  body:`
  <div class="sec"><h4>私の役割</h4>
    <p><b>据付・コミッショニング</b> — コンベヤだけでなく、Sumitronicプロジェクト全体に携わっています。両システムを現地で据え付け、配線、設定、試験を行い、生産で使える状態に仕上げました。</p></div>
  <div class="sec"><h4>状況</h4><ul>
    <li><b>完了</b> — コンベヤ Type 1 とESDゲートの据付・コミッショニング</li>
    <li><b>次の予定</b> — コンベヤ Type 2・Type 3 の据付と試験</li></ul></div>
  <div class="sec"><h4>コンベヤ · PCB搬送</h4>
    <p>隣の部屋のほこりを生産エリアに入れずに、部屋から部屋へPCBを搬送するコンベヤです。</p>
    <ul>
      <li><b>部屋間のインターロック</b> — 両側の扉が同時に開かないようにし、ほこりの侵入を防止</li>
      <li><b>オムロンPLCによる制御</b> — センサーで各PCBの位置を検出・確認してから、それぞれの扉を開閉</li>
      <li><b>安全と操作</b> — 非常停止と、HMIから切り替えられる自動／手動モード</li>
    </ul></div>
  <div class="sec"><h4>ESDゲート · 静電気チェック</h4>
    <p>生産エリアに入る前に従業員をチェックし、人体の静電気によって電子部品が損傷するのを防ぐゲートです。</p>
    <ul>
      <li><b>顔認証</b> — 通過する従業員を識別</li>
      <li><b>人体の静電気測定</b> — 測定値が基準値以内のときだけゲートを開放</li>
      <li><b>データログ</b> — 一人ひとりの結果を記録し、TCP/IPで接続</li>
    </ul></div>
  <div class="sec"><h4>ギャラリー</h4><div class="gallery">
    <img src="assets/sumi_conv_3.webp" alt="部屋間の受け渡し口につながるカーブコンベヤ">
    <img src="assets/sumi_conv_8.webp" alt="Transfer Operate のHMI画面">
    <img src="assets/sumi_conv_9.webp" alt="制御盤内のオムロンPLC">
    <img src="assets/sumi_conv_2.webp" alt="コンベヤを据え付けるチーム">
    <img src="assets/sumi_esd_1.webp" alt="ESDゲートの据付作業"></div></div>`
},
{
  id:"troubleshooting", box:[0,0,0,0],
  kicker:"フィールドサービス · 技術的知見",
  title:"Field Troubleshooting Log",
  short:"自動駐車場の現場で実際の問題を解決しながら学んだことです。一つひとつの問題から、どの機械にも通じる原則を得ました。",
  tags:["Safety interlock","State machine","Timing","Sensors","HMI / SCADA"],
  body:`
  <div class="sec"><h4>トラブル対応の進め方</h4>
    <div class="steps"><span>実際の症状を確認（カメラ、アラーム、ログ）</span><i>→</i><span>シーケンスをたどって根本原因を特定</span><i>→</i><span>症状ではなく条件を修正</span><i>→</i><span>現地で試験</span><i>→</i><span>修正前後を記録</span></div></div>
  <div class="sec"><h4>現場から学んだこと</h4><div class="know">
    <div class="k"><b>安全インターロック</b>
      <p>扉や機械を動かしてよいのは、<em>すべて</em>の安全条件がそろったときだけです。センサー1つが「空いている」と示しただけでは不十分です。</p>
      <span class="ex">例：別の車がループコイルの上で待っていても、リフトに車の荷下ろし指令が残っている間は、駐車室の扉を開けない。</span></div>
    <div class="k"><b>状態遷移とトランザクション</b>
      <p>利用者が途中でやめた操作には、明確な戻り道が必要です。そうしないと、残ったデータが次の利用者に影響します。</p>
      <span class="ex">例：タッチされたものの確定されなかったカード番号を消去し、STARTを受け付ける前に、駐車室に車があることを確認する。</span></div>
    <div class="k"><b>タイマーとウォッチドッグ</b>
      <p>よいタイマーは「故障で遅い」と「実際の状況で遅い」を区別します。短すぎると機械が頻繁に止まり、長すぎると本当の故障を見逃します。</p>
      <span class="ex">例：センタリングとロボットのオーバータイムの調整、瞬時の電圧低下に対するディレイ、ターンテーブルへのディレイ追加。</span></div>
    <div class="k"><b>センサーの特性と配置</b>
      <p>センサーの位置と角度は、プログラムと同じくらい重要です。車の大きさによって、信号の反射や遮られ方が変わります。</p>
      <span class="ex">例：後輪を正確に検出できるようセンタリングセンサーの角度を調整し、小型車には別のタイヤ位置チェックを追加。</span></div>
    <div class="k"><b>縮退運転を前提とした設計</b>
      <p>よいシステムは、機器が1台止まっても、一部のサービスを続けられます。</p>
      <span class="ex">例：ほとんどの車を、2基のリフトのどちらからでも出し入れできる位置に駐車させる。</span></div>
    <div class="k"><b>ヒューマンマシンインターフェース</b>
      <p>利用者が同じ操作ミスを繰り返すとき、原因の多くは利用者ではなく、システムの伝え方にあります。</p>
      <span class="ex">例：HMIで車の移動を案内するメッセージ、誘導灯、制御室への警報音付きのSCADAアラーム。</span></div>
  </div></div>
  <div class="sec"><h4>事例</h4>
    <div class="case"><h5>リフトの動作中に、2台目の車が駐車室に進入した</h5><dl>
      <dt>症状</dt><dd>カートがリフトに車を載せている間に、別の車が外のループコイルに乗り、扉が開いて新しい車が進入した。</dd>
      <dt>原因</dt><dd>扉を開く条件がループコイルだけを見ており、リフトに荷下ろし指令が残っているかを確認していなかった。</dd>
      <dt>対策</dt><dd>リフトに残っている指令がないときだけ扉が開くようインターロックを追加し、現地のカメラ映像で確認した。</dd>
      <dt>教訓</dt><dd>センサーは「状況」を伝えるが、安全のためには「システムの状態」も確認する必要がある。</dd></dl>
      <a class="rlink" href="assets/reports/2026-03-27-robot-overtime-err297.pdf" target="_blank" rel="noopener">${PDF_IC} 報告書の原本を開く</a></div></div>
  <div class="sec"><h4>報告書ライブラリ</h4>
    <p class="muted">各修正の後に私が作成した実際の報告書です。クリックするとPDFが開きます（報告書は英語です）。</p>
    <div class="rfilter" role="tablist">${["すべて",...REPORT_CATS].map((c,i)=>`<button data-rcat="${i?c:""}" class="${i?"":"on"}">${c}</button>`).join("")}</div>
    <div class="rlist">${REPORTS.map(r=>`<a href="assets/reports/${r.f}.pdf" target="_blank" rel="noopener" data-cat="${r.c}">
      <span class="rd">${r.d}</span><span class="rt"><small class="rp">${r.p}</small>${REPORT_TJ[r.f]||r.t}</span><span class="rc">${r.c}</span>${PDF_IC}</a>`).join("")}</div></div>`
},
{
  id:"slc", box:[0,0,0,0],
  kicker:"自動駐車場 · 今後のプロジェクト",
  title:"SLC", soon:true,
  short:"Siamese LM@GS と同じ範囲を担当する、新しい自動駐車場プロジェクトです。現在は立ち上げ段階です。",
  tags:["PLC","HMI","Commissioning","進行中"],
  body:`
  <div class="sec"><h4>担当範囲</h4>
    <p>Siamese LM@GS での経験をもとに、制御盤から引き渡しまでを担当します。</p>
    <ul>
      <li><b>制御盤の試験</b> — 機械と接続する前に、配線を確認し、電気・制御系のI/O信号をすべて試験します。</li>
      <li><b>PLCプログラミング</b> — リフトの動作シーケンス、駐車スペースの選択、扉の安全インターロック、アラーム。</li>
      <li><b>ドライバー向けの表示</b> — 駐車室のHMI、誘導灯、出庫待ちの順番表示。</li>
      <li><b>精算機・カードリーダーとの連携</b> — POS、カードリーダー、PLC間の通信を設計し、試験します。</li>
      <li><b>現地コミッショニング</b> — 実際の車ですべてのフローを試験し、引き渡し後の改修まで対応します。</li>
    </ul></div>
  <div class="sec"><h4>進め方</h4>
    <div class="steps"><span>制御盤の試験</span><i>→</i><span>PLC／HMIプログラム</span><i>→</i><span>現地でのI/O試験</span><i>→</i><span>実車での試験</span><i>→</i><span>引き渡しとアフターサービス</span></div></div>
  <div class="sec"><h4>Siamese LM@GS の教訓を初日から活かす</h4><ul>
    <li><b>システムの状態に基づくインターロック</b> — 駐車室前のセンサーだけで判断せず、リフトに未完了の指令がないときだけ扉を開けます。</li>
    <li><b>カード番号を残さない</b> — 利用者が操作を途中でやめた場合は、必ずカード番号を消去します。</li>
    <li><b>リフトが1基止まっても運用を続ける</b> — もう1基のリフトで出庫できるよう、駐車スペースの優先順位を設計します。</li>
    <li><b>立ち上げ時からデータを記録</b> — タイムアウト時間は現場の実情に合わせて設定し、データログを PT-Autopark Dashboard にすぐ接続できるようにします。</li></ul></div>
  <div class="sec"><h4>状況</h4><p>立ち上げ段階 — 進捗はここで更新します。</p></div>`
},
{
  id:"bdms", box:[0,0,0,0],
  kicker:"自動駐車場 · 来年",
  title:"BDMS Phuket", soon:true,
  short:"来年開始予定の、プーケットの自動駐車場プロジェクトです。Siamese LM@GS と同じ範囲を担当します。",
  tags:["PLC","HMI","Commissioning","来年"],
  body:`
  <div class="sec"><h4>期待されていること</h4><p>プロジェクトに参画し、据付と試験を円滑に完了させること。</p></div>
  <div class="sec"><h4>私の役割</h4><ul>
    <li><b>制御盤の試験</b> — 機械と接続する前に、配線を確認し、I/O信号を試験します。</li>
    <li><b>PLCプログラミング</b> — リフトの動作シーケンス、駐車スペースの選択、扉の安全インターロック、アラーム。</li>
    <li><b>ドライバー向けの表示</b> — HMI、誘導灯、出庫待ちの順番表示。</li>
    <li><b>精算機・カードリーダーとの連携</b> — POS、カードリーダー、PLC間の通信を試験します。</li>
    <li><b>現地コミッショニング</b> — 実際の車ですべてのフローを試験し、引き渡し後の改修まで対応します。</li></ul></div>
  <div class="sec"><h4>準備していること</h4><ul>
    <li>制御盤が現場に届く前に電気図面とI/Oリストを確認し、現地での試験時間を短縮します。</li>
    <li>Siamese LM@GS と SLC で蓄積した試験チェックリストを活用します。</li>
    <li>コミッショニングの段階からデータログを記録し、PT-Autopark Dashboard に接続します。</li>
    <li>現場が遠方のため、VPN経由のリモート接続を用意し、引き渡し後も迅速にサポートできるようにします。</li></ul></div>
  <div class="sec"><h4>状況</h4><p>未着手 — プロジェクトは来年開始です。進捗はここで更新します。</p></div>`
}];

const ABOUT_JA = `
  <div class="kicker">About</div>
  <h2>Supawit Prommas</h2>
  <p class="teaser"><b style="color:var(--red)">System Engineer</b> · Automation &amp; Control</p>
  <div class="facts"><span>実務経験6年</span><span>PLC · HMI/SCADA · IoT</span><span>アソシエイト・エンジニア（電気）／タイ技術者評議会</span></div>
  <div class="sec"><h4>はじめに</h4>
    <p>スパウィット（愛称：アース）と申します。機械を安全かつ確実に自動で動かすことにやりがいを感じている電気エンジニアです。
    この6年間で、建物の電気設備工事から、高速自動ドアの回路設計とPLCプログラミングを経験し、
    現在は自動駐車システムを、制御盤やHMI画面から現地でのコミッショニングまで一貫して担当しています。</p></div>
  <div class="sec"><h4>仕事の進め方</h4><ul>
    <li><b>根本原因から考える</b> — 機械が止まったときは、症状だけに対処せず、シーケンス、センサー、ログから本当の原因をたどってから修正します</li>
    <li><b>安全を最優先にする</b> — プログラムを変更するときは、常に機械の前に立つ人のことを考えます</li>
    <li><b>現場とソフトウェアをつなぐ</b> — PLCに加えてPythonを書き、IoTやWebで機械のデータを可視化し、AIで繰り返し作業を減らしています</li>
    <li><b>人と協力する</b> — 施工業者、サプライヤー、他部署と調整し、期限内に仕事を完了させます</li></ul></div>
  <div class="sec"><h4>技術スキル</h4><div class="skills">
    <div class="skill"><b>PLC Programming</b><span>Siemens (TIA Portal, STEP 7), Mitsubishi (GX Works) · LD, FBD, ST (SCL)</span></div>
    <div class="skill"><b>HMI / SCADA & IoT</b><span>Siemens WinCC, IoT (VPN Passthrough)</span></div>
    <div class="skill"><b>Industrial Protocols</b><span>Modbus (RTU/TCP), PROFIBUS, PROFINET, Ethernet/IP, OPC Server</span></div>
    <div class="skill"><b>Electrical Design</b><span>AutoCAD Electrical, 制御盤設計, 配線図</span></div>
    <div class="skill"><b>Motor Drives</b><span>VFD／インバーター（Siemens, Mitsubishi, Delta, Schneider）</span></div>
    <div class="skill"><b>Software</b><span>Python, C++</span></div></div></div>
  <div class="sec"><h4>資格</h4><ul>
    <li>アソシエイト・エンジニア（電気工学・電力／制御分野）、タイ技術者評議会（COE）認定の技術者資格 — 2021年</li>
    <li>PLC & SCADA Advanced Programming、Mitsubishi Electric Thailand — 2022年</li></ul></div>
  <div class="sec"><h4>学歴</h4>
    <p><b>工学士（電気工学・電力）</b> — マハナコーン工科大学、2020年<br>
    <span style="color:var(--ink2)">卒業研究：Arduinoによるモーター制御システムを搭載した電動自転車</span></p></div>
  <div class="sec only-review"><h4>現在の役割</h4>
    <p>R&amp;D部門 — 自動駐車システムを担当し、制御盤の試験、PLC/HMIプログラミング、コミッショニングからフィールドサービスまで行っています。
    また、チームの業務を改善する社内向けのデジタルツールも開発しています。</p></div>
  <div class="btns"><a class="btn only-portfolio" href="${RESUME}" download>${IC.doc} 履歴書をダウンロード（PDF）</a><button class="btn ghost" data-go="contact">お問い合わせ →</button></div>`;

const CONTACT_JA = `
  <div class="kicker">Contact</div>
  <h2>お気軽にご連絡ください</h2>
  <div class="bcard" aria-label="名刺"><div class="band">SP</div>
    <div class="main"><div class="nm">Mr. Supawit Prommas</div><div class="rule"></div><div class="ttl">SYSTEM ENGINEER</div></div></div>
  <p class="teaser" style="margin:0 0 20px">一緒にお仕事をしたい方、自動化・PLC・SCADA/IoTについてお話ししたい方は、メールまたはお電話でご連絡ください。</p>
  <div class="contacts">
    <a class="contact" href="mailto:${EMAIL}"><span class="ic">${IC.mail}</span><span><small>Email</small><b>${EMAIL}</b></span><button class="copy" data-copy="${EMAIL}">コピー</button></a>
    <a class="contact" href="tel:${TEL}"><span class="ic">${IC.phone}</span><span><small>Phone</small><b>${PHONE}</b></span><button class="copy" data-copy="${PHONE}">コピー</button></a>
    <div class="contact"><span class="ic">${IC.pin}</span><span><small>Location</small><b>タイ・ノンタブリー県</b></span></div>
  </div>
  <div class="btns only-portfolio"><a class="btn" href="${RESUME}" download>${IC.doc} 履歴書をダウンロード（PDF）</a><a class="btn ghost" href="${RESUME}" target="_blank" rel="noopener">履歴書を見る</a></div>`;

const KPI_JA = {
  kicker: "R&D部門 · 2026年10月末時点",
  title: "R&D KPIサマリー",
  intro: "評価項目ごとに成果をまとめました。各項目をクリックすると、詳細をご覧いただけます。",
  groups: {
    error: { title: "Error（トラブル対応）", text: "自動駐車システムの現場でのトラブル対応とプログラム修正です。すべての案件を、修正前後の報告書として記録しています。" },
    new:   { title: "New project（新規プロジェクト）", text: "据付、試験、コミッショニングを担当する新規プロジェクトです。BDMS Phuket は来年開始です。" },
    goal:  { title: "Personal goal（個人目標）", text: "自ら設定した目標で、2件とも達成しました。" }
  },
  notes: {
    troubleshooting: "根本原因を特定して条件そのものを修正し、実際の報告書として記録しています。報告書ライブラリから原本を閲覧できます。",
    siamese: "制御盤の試験、PLC/HMIプログラミング、精算システムとの連携、コミッショニング、引き渡し後の改善。",
    sumitronic: "コンベヤ Type 1 とESDゲートの据付・コミッショニングを完了。次は Type 2 と Type 3 です。",
    slc: "立ち上げ段階。Siamese LM@GS と同じ範囲（制御盤の試験、PLC／HMI、精算機との連携、コミッショニング）を担当します。",
    bdms: "来年開始。Siamese LM@GS と同じ役割で、プロジェクトに参画し、据付と試験を円滑に完了させることが期待されています。",
    dashboard: "目標：全プロジェクトを一か所で把握し、実際の稼働状況から機械の劣化を評価し、データログに簡単にアクセスできること — 達成。",
    travel: "目標：繰り返し作業に費やす時間のムダをなくすこと — 達成。"
  },
  print: "サマリーをダウンロード（PDF）"
};
