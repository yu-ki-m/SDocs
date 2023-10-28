import { UuidInterface } from '../../../components/Uuid'

/**
 * TemplateContentState
 * @param id 内容の識別子
 * @param contentType 内容のタイプ
 * @param contents 内容
 */
export type TemplateContentStateType = {
    id: string
    contentType: string
    content: string
}

export interface TemplateContentStateInterface extends TemplateContentState {
    id: string
    contentType: string
    content: string
}
export class TemplateContentState implements TemplateContentStateInterface {
    id: string
    contentType: string
    content: string
    constructor(initValue: TemplateContentState) {
        this.id = initValue.id
        this.contentType = initValue.contentType
        this.content = initValue.content
    }
}

/**
 * TemplateContentsState
 * @param contents テンプレートのコンテンツ
 */
export type TemplateContentsStateType = {
    contents: TemplateContentStateInterface[]
}
export interface TemplateContentsStateInterface extends TemplateContentsStateType {
    updateContent: (contents: TemplateContentStateInterface[], contentUnitId: string, value: string) => void
    deleteContent: (
        contents: TemplateContentStateInterface[],
        contentUnitIndex: number
    ) => TemplateContentStateInterface[]
    addContentsRichEditor: (
        contents: TemplateContentStateInterface[],
        uuidCreator: UuidInterface
    ) => TemplateContentStateInterface[]
    addContentsNestTable: (
        contents: TemplateContentStateInterface[],
        uuidCreator: UuidInterface
    ) => TemplateContentStateInterface[]
    addContentsRichTable: (
        contents: TemplateContentStateInterface[],
        uuidCreator: UuidInterface
    ) => TemplateContentStateInterface[]

    insertNewContentsRichEditor: (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => TemplateContentStateInterface[]
    insertNewContentsNestTable: (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => TemplateContentStateInterface[]
    insertNewContentsRichTable: (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => TemplateContentStateInterface[]
    moveIndex: (contents: TemplateContentStateInterface[], from: number, to: number) => TemplateContentStateInterface[]
}
export class TemplateContentsState implements TemplateContentsStateInterface {
    contents: TemplateContentState[]
    constructor(contents: TemplateContentState[]) {
        this.contents = contents
    }

    updateContent = (contents: TemplateContentStateInterface[], contentUnitId: string, value: string) => {
        const contentUnitTmp = contents.find((content) => content.id === contentUnitId)
        if (contentUnitTmp !== undefined) {
            contentUnitTmp.content = value
        }
        return contents
    }

    deleteContent = (contents: TemplateContentStateInterface[], contentUnitIndex: number) => {
        contents.splice(contentUnitIndex, 1)
        return contents
    }

    addContentsRichEditor = (contents: TemplateContentStateInterface[], uuidCreator: UuidInterface) => {
        const templateContent: TemplateContentStateInterface = new TemplateContentState({
            id: uuidCreator.getUniquId(),
            contentType: 'quill',
            content: ''
        })
        //this.contents.push(templateContent)
        const contentsTmp = [...contents, templateContent]
        return contentsTmp
    }

    addContentsNestTable = (contents: TemplateContentStateInterface[], uuidCreator: UuidInterface) => {
        const templateContent: TemplateContentStateInterface = new TemplateContentState({
            id: uuidCreator.getUniquId(),
            contentType: 'nest-table',
            content: ''
        })
        //this.contents.push(templateContent)
        const contentsTmp = [...contents, templateContent]
        return contentsTmp
    }
    addContentsRichTable = (contents: TemplateContentStateInterface[], uuidCreator: UuidInterface) => {
        const templateContent: TemplateContentStateInterface = new TemplateContentState({
            id: uuidCreator.getUniquId(),
            contentType: 'rich-table',
            content: ''
        })
        //this.contents.push(templateContent)
        const contentsTmp = [...contents, templateContent]
        return contentsTmp
    }

    addContentsGridEditor = (contents: TemplateContentStateInterface[], uuidCreator: UuidInterface) => {
        const templateContent: TemplateContentStateInterface = new TemplateContentState({
            id: uuidCreator.getUniquId(),
            contentType: 'grid-editor',
            content: ''
        })
        //this.contents.push(templateContent)
        const contentsTmp = [...contents, templateContent]
        return contentsTmp
    }
    addContentsFlexGridEditor = (contents: TemplateContentStateInterface[], uuidCreator: UuidInterface) => {
        const templateContent: TemplateContentStateInterface = new TemplateContentState({
            id: uuidCreator.getUniquId(),
            contentType: 'flex-grid-editor',
            content: ''
        })
        //this.contents.push(templateContent)
        const contentsTmp = [...contents, templateContent]
        return contentsTmp
    }
    addContentsPageBreakLine = (contents: TemplateContentStateInterface[], uuidCreator: UuidInterface) => {
        const templateContent: TemplateContentStateInterface = new TemplateContentState({
            id: uuidCreator.getUniquId(),
            contentType: 'page-break-line',
            content: ''
        })
        //this.contents.push(templateContent)
        const contentsTmp = [...contents, templateContent]
        return contentsTmp
    }
    insertNewContentsRichEditor = (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => {
        contents = this.addContentsRichEditor(contents, uuidCreator)
        contents = this.moveIndex(contents, contents.length - 1, to)
        return contents
    }

    insertNewContentsNestTable = (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => {
        contents = this.addContentsNestTable(contents, uuidCreator)
        contents = this.moveIndex(contents, contents.length - 1, to)
        return contents
    }
    insertNewContentsRichTable = (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => {
        contents = this.addContentsRichTable(contents, uuidCreator)
        contents = this.moveIndex(contents, contents.length - 1, to)
        return contents
    }
    insertNewContentsGridEditor = (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => {
        contents = this.addContentsGridEditor(contents, uuidCreator)
        contents = this.moveIndex(contents, contents.length - 1, to)
        return contents
    }
    insertNewContentsFlexGridEditor = (
        contents: TemplateContentStateInterface[],
        to: number,
        uuidCreator: UuidInterface
    ) => {
        contents = this.addContentsFlexGridEditor(contents, uuidCreator)
        contents = this.moveIndex(contents, contents.length - 1, to)
        return contents
    }
    insertPageBreakLine = (contents: TemplateContentStateInterface[], to: number, uuidCreator: UuidInterface) => {
        contents = this.addContentsPageBreakLine(contents, uuidCreator)
        contents = this.moveIndex(contents, contents.length - 1, to)
        return contents
    }
    moveIndex = (contents: TemplateContentStateInterface[], from: number, to: number) => {
        const target = contents[from]
        contents.splice(from, 1)
        contents.splice(to, 0, target)
        return contents
    }
}
