import { writeFile, mkdir, existsSync } from 'fs'
import { join } from 'path'
import dayjs from 'dayjs'

export class SdocsLogFs {
    private outputDir: string
    private fileCategory: string
    private extensionName: string

    constructor(outputDir: string, fileCategory: string, extensionName: string) {
        this.outputDir = outputDir
        this.fileCategory = fileCategory
        this.extensionName = extensionName
    }

    private getUniqueFileName(baseName: string): string {
        let counter = 0
        let fileName = baseName

        while (existsSync(join(this.outputDir, fileName))) {
            counter++
            fileName = `${baseName}_${counter}`
        }

        return fileName
    }

    public saveLogFile(data: string): void {
        const currentDateTime = dayjs().format('YYYYMMDD_HHmmss')
        const baseFileName = `${this.fileCategory}_${currentDateTime}.${this.extensionName}`
        const uniqueFileName = this.getUniqueFileName(baseFileName)
        const outputPath = join(this.outputDir, uniqueFileName)

        mkdir(this.outputDir, { recursive: true }, (err) => {
            if (err) {
                console.error('ディレクトリの作成に失敗:', err)
                return
            }

            writeFile(outputPath, data, 'utf-8', (err) => {
                if (err) {
                    console.error('ファイルの書き込みに失敗:', err)
                } else {
                    console.log(`${outputPath} が正常に書き込まれました。`)
                }
            })
        })
    }
}
