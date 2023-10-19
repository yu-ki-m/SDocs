import { elementToSVG } from 'dom-to-svg'

export class DomToSvg {
    static parse(document: Document, targetId: string) {
        const targetElement: HTMLElement | null = document.getElementById(targetId)
        if (targetElement) {
            const svgDocument = elementToSVG(targetElement)
            //inlineResources(svgDocument.documentElement)
            return new XMLSerializer().serializeToString(svgDocument)
        }
        return 'Error'
    }
}
