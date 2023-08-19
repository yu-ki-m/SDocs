/**
 * DocsBaseInfoStateのコンストラクタ引数の型定義
 */
export type DocsBaseInfoState = {
    /** 基本情報：Docs名 */
    docsName: string
    /** 基本情報：Docsバージョン */
    docsVersion: string
    /** 基本情報：DocsのID */
    docsId: string
}

/**
 * EditorPageのDocsBaseInfoModelインターフェース
 */
export interface DocsBaseInfoModelInterface extends DocsBaseInfoState {
    init(initValue: DocsBaseInfoState): void
    allUpdate(updateValue: DocsBaseInfoState): void
}

/**
 * EditorPageのDocsBaseInfoModelクラス
 */
export default class DocsBaseInfoModel implements DocsBaseInfoModelInterface {
    docsName: string
    docsVersion: string
    docsId: string

    constructor(initValue: DocsBaseInfoState) {
        this.docsName = initValue.docsName
        this.docsVersion = initValue.docsVersion
        this.docsId = initValue.docsId
    }
    init(initValue: DocsBaseInfoState) {
        this.docsName = initValue.docsName
        this.docsVersion = initValue.docsVersion
        this.docsId = initValue.docsId
    }
    allUpdate(updateValue: DocsBaseInfoState) {
        this.docsName = updateValue.docsName
        this.docsVersion = updateValue.docsVersion
        this.docsId = updateValue.docsId
    }
}
