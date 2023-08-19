import { TemplateContents } from '../../../components/sdocs/TemplateContents'

let templateContentsA: TemplateContents[] = []

templateContentsA = [
    ...templateContentsA,
    new TemplateContents('template-id-1', 'template-contents-id-1', 1, 'quill', 'template-contents-1')
]
templateContentsA = [
    ...templateContentsA,
    new TemplateContents('template-id-2', 'template-contents-id-2', 2, 'quill', 'template-contents-2')
]
templateContentsA = [
    ...templateContentsA,
    new TemplateContents('template-id-3', 'template-contents-id-3', 3, 'quill', 'template-contents-3')
]

export { templateContentsA }
