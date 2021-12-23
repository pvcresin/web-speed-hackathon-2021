## 開発

https://github.com/pvcresin/web-speed-hackathon-2021/blob/main/docs/DEVELOPMENT.md

root で `yarn start` で API サーバ起動
client で `yarn develop` で devServer 起動
`yarn analyze` でバンドルアナライザ起動

main に push するとコードが[heroku でデプロイ](https://dashboard.heroku.com/apps/pvcresin-wsh-2021/activity)される: https://pvcresin-wsh-2021.herokuapp.com/

[LeaderBoard](https://github.com/CyberAgentHack/web-speed-hackathon-2021-leaderboard) の [Issue ](https://github.com/CyberAgentHack/web-speed-hackathon-2021-leaderboard/issues/21)に`/rerun`とコメントすると測定される

## 参考

今回の問題についての Post

- https://developers.cyberagent.co.jp/blog/archives/32747/

ルールとか

- https://github.com/CyberAgentHack/web-speed-hackathon-2021/tree/main/docs/internal

前回の解説とか

- https://github.com/CyberAgentHack/web-speed-hackathon-2020/wiki/Web-Speed-Hackathon-Online-%E5%87%BA%E9%A1%8C%E3%81%AE%E3%81%AD%E3%82%89%E3%81%84%E3%81%A8%E8%A7%A3%E8%AA%AC#jquery

## 作業

やった

- [x] code-js の polyfill 削減(browserslist, usage)
- [x] moment to dayjs（L のフォーマットは localize のプラグイン必要だった）
- [x] lodash の個別 import, 削除（Math.max との違いにハマった。VRT で波形表示されてないのに気づけた,）
- [x] JS の defer
- [x] scroll で 2 \*\* 18
- [x] 画像や音声周りの CLS 対応（AspectRatio など）
- [x] 画像の blob 変換削除
- [x] 謎の setTimeout
- [x] 画像の LazyLoading
- [x] 画像の最適化（サイズ削減・AVIF・squoosh）
- [x] jQuery 削除
- [x] Purge CSS
- [x] CSS の lazyload
- [x] Sourcemap 最適化
- [x] FontAwesome（svg） 削減
- [x] Code Splitting（dynamic import）
- [x] 音声の AAC 化
- [x] WebFont (font-display: swap;に)
- [x] JS/CSS を brotli で配信（Prefetch 分は未対応）
- [x] Inject で Chunk をいれられるようにする JS を Prefetch した
- [x] Cache-Control: max-age を伸ばす + contenthash つけた

TODO

- [ ] 画像ファイルによってはアップロードできずにエラーになってそう
- [ ] Critical CSS のインライン化（なんか webfont の方もインライン化された。プラグインが競合？）
- [ ] 音声の blob 変換削除
- [ ] バンドルサイズ削減（Lodash、ProvidePlugin まわり）
- [ ] http1.1 -> http2,3 への移行（spdy、https）
- [ ] IntersectionObserver, requestAnimationFrame 周りでスクロールの処理間引く
- [ ] React.memo 足りない場所いろいろありそう
- [ ] 規約ページは静的に配信できる
- [ ] SSR の導入
- [ ] fetchMore で limit, offset 使えてなくて草。全件取得は森
