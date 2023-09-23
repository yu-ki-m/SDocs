export class DomToHtml {
    static parse(document: Document, targetId: string) {
        const targetElement: HTMLElement | null = document.getElementById(targetId)
        if (targetElement) {
            const htmlDocument = this.domToHtml(targetElement)
            if (!htmlDocument) return 'Error'
            return htmlDocument
        }
        return 'Error'
    }

    static domToHtml(element: HTMLElement): string {
        if (element.nodeType === 3) {
            // Text node
            return element.nodeValue || ''
        }

        if (element.nodeType === 1 && element instanceof HTMLElement) {
            // Element node
            let html = `<${element.tagName.toLowerCase()}`

            // Add attributes
            for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes[i]
                if (attr.name !== 'style') {
                    // Skip style as we handle it separately
                    html += ` ${attr.name}="${attr.value}"`
                }
            }

            // Add styles
            const inlineStyles = this.getInlineStyles(element)
            const appliedStyles = this.getAppliedStyles(element)
            const combinedStyles = inlineStyles + ';' + appliedStyles
            if (combinedStyles) {
                html += ` style="${combinedStyles}"`
            }

            html += '>'

            // Process child nodes
            for (let i = 0; i < element.childNodes.length; i++) {
                html += this.domToHtml(element.childNodes[i] as HTMLElement)
            }

            html += `</${element.tagName.toLowerCase()}>`
            return html
        }

        return ''
    }
    static getInlineStyles(element: HTMLElement): string {
        return element.getAttribute('style') || ''
    }

    static getAppliedStyles(element: HTMLElement): string {
        const styles = window.getComputedStyle(element)
        let styleString = ''
        for (let i = 0; i < styles.length; i++) {
            const styleName = styles[i]
            const styleValue = styles.getPropertyValue(styleName)
            if (styleValue) {
                styleString += `${styleName}:${styleValue};`
            }
        }
        return styleString
    }
}
