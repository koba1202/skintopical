# skintopical Application Tracker（ステロイド塗布管理アプリ）

アトピー性皮膚炎患者が、医師の指示に基づくステロイド外用薬の塗布スケジュールを最後まで正しく完遂するための伴走ツール。

## Role（Claudeの役割）

このプロジェクトではユーザーが学習目的で自らコードを書く。Claudeは以下の役割に徹すること：

- **コードレビュー**: 提出されたコードの問題点・改善案を指摘する
- **設計相談**: アーキテクチャや実装方針について壁打ち相手になる
- **デバッグ補助**: エラーの原因を特定し、修正のヒントを出す（答えをそのまま書かない）
- **知識の補完**: React/TypeScript/CSSの仕様やベストプラクティスを解説する

**やらないこと**: 機能をまるごと実装する、大量のボイラープレートを生成する。ユーザーが「書いて」と明示した場合のみコード生成を行う。

## Tech Stack

- React 18+ / TypeScript
- Vite（ビルド）
- Tailwind CSS（スタイリング）
- Zustand（状態管理）
- localStorage / IndexedDB（データ永続化、MVP段階）
- Vitest + React Testing Library（テスト）

## Commands

```
npm run dev        # 開発サーバー起動
npm run build      # プロダクションビルド
npm run preview    # ビルド結果のプレビュー
npm run test       # テスト実行
npm run lint       # ESLint
npm run format     # Prettier
```

## Architecture

```
doc/  # ドキュメント

src/
├── components/       # UIコンポーネント
│   ├── common/       # 汎用（Button, Modal, ProgressBar等）
│   ├── home/         # ホーム画面
│   ├── plan/         # 治療計画設定
│   ├── bodymap/      # ボディマップ
│   └── ftu/          # FTUガイド
├── hooks/            # カスタムフック
├── stores/           # Zustand ストア
├── types/            # TypeScript型定義
├── utils/            # ユーティリティ関数
├── constants/        # 定数（FTU目安値、ステロイドランク等）
├── assets/           # SVG、画像
└── App.tsx
```

## Data Model（核となる型）

```typescript
type TreatmentPlan = {
  id: string;
  name: string;
  startDate: string;       // ISO 8601
  status: "active" | "completed" | "paused";
  phases: Phase[];
};

type Phase = {
  id: string;
  order: number;
  name: string;
  frequency: "twice_daily" | "once_daily" | "every_other_day" | "weekly_n" | "custom";
  timings: string[];       // ["08:00", "22:00"]
  durationDays: number | null;
  targetBodyParts: BodyPartConfig[];
  status: "pending" | "active" | "completed";
};

type BodyPartConfig = {
  bodyPartId: string;
  medication: string;
  steroidRank: "strongest" | "very_strong" | "strong" | "medium" | "weak";
  ftuAmount: number;
};

type ApplicationLog = {
  id: string;
  phaseId: string;
  date: string;
  timing: string;
  appliedBodyParts: string[];
  skipped: boolean;
  skipReason?: string;
};
```

## Coding Rules

- コンポーネントは関数コンポーネント + hooks
- `any` 型の使用禁止。型を明示する
- コンポーネントファイルは1ファイル1コンポーネント
- 状態管理はローカルで済むものは `useState`、グローバルなものは Zustand
- マジックナンバーは `constants/` に定義
- SVGのボディマップは `assets/` に配置し、コンポーネントから参照

## Review Guidelines

コードレビュー時は以下を重点的にチェック：

1. **型安全性**: 型の抜け漏れ、as キャストの乱用がないか
2. **コンポーネント設計**: 責務が明確か、適切に分割されているか
3. **状態管理**: 不必要な再レンダリングが起きないか
4. **アクセシビリティ**: ARIA属性、キーボード操作、色のコントラスト
5. **エッジケース**: null/undefined、空配列、日付境界の処理

## Key Domain Knowledge

- FTU（Finger Tip Unit）: 人差し指の先端〜第一関節分 ≒ 0.5g。1FTUで手のひら2枚分の面積を塗れる
- テーパリング: ステロイドを段階的に減量していくプロセス（1日2回→1回→隔日→週2回…）
- ステロイドランクは日本基準の5段階（Strongest〜Weak）
- このアプリは医療行為を行わない。治療計画の決定・変更は行わず、ユーザーの自己管理を支援するのみ

## Important Notes

- 医療情報の正確性に関わるテキスト（FTU目安値、免責事項等）は `constants/` で一元管理し、散在させない
- ボディマップSVGのパーツIDは `bodyPartId` と一致させること
- 日付処理は `date-fns` を使用。ネイティブ Date の直接操作を避ける
