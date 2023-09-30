export class DomToHtml {
    static styleCounter = 0
    static styleMap: { [key: string]: string } = {}
    static styleSet: Set<string> = new Set()

    static parse(document: Document, targetId: string) {
        const targetElement: HTMLElement | null = document.getElementById(targetId)
        let styles = ''

        if (targetElement) {
            const htmlDocument = this.domToHtml(targetElement)
            styles = this.generateStyles()
            if (!htmlDocument) return 'Error'
            return `<style>${styles}</style>` + htmlDocument
        }
        return 'Error'
    }

    static domToHtml(element: HTMLElement): string {
        if (element.nodeType === 3) {
            return element.nodeValue || ''
        }

        if (element.nodeType === 1 && element instanceof HTMLElement) {
            let html = `<${element.tagName.toLowerCase()}`

            // Copy attributes except 'class' and 'style'
            for (let i = 0; i < element.attributes.length; i++) {
                const attr = element.attributes[i]
                if (attr.name !== 'class' && attr.name !== 'style') {
                    html += ` ${attr.name}="${attr.value}"`
                }
            }

            const appliedStyles = this.getAppliedStyles(element)
            if (appliedStyles) {
                const className = this.addStyle(appliedStyles)
                html += ` class="${className}"`
            }

            html += '>'

            for (let i = 0; i < element.childNodes.length; i++) {
                html += this.domToHtml(element.childNodes[i] as HTMLElement)
            }

            html += `</${element.tagName.toLowerCase()}>`
            return html
        }

        return ''
    }

    static addStyle(style: string): string {
        if (this.styleMap[style]) {
            return this.styleMap[style]
        }

        const className = `style-${this.styleCounter++}`
        this.styleMap[style] = className
        this.styleSet.add(style)
        return className
    }

    static generateStyles(): string {
        let styles = ''
        for (const style of this.styleSet) {
            const className = this.styleMap[style]
            styles += `.${className} { ${style} }\n`
        }
        return styles
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
