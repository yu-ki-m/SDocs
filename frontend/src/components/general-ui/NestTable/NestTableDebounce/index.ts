export const debounce = (fn: (...args: any[]) => void, delay: number) => {  // eslint-disable-line
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    return function (...args: any[]) {   // eslint-disable-line
        // 既存のタイムアウトがあればクリア
        if (timeoutId !== null) {
            clearTimeout(timeoutId)
        }

        // 新しいタイムアウトを設定して、指定された遅延後に関数を実行
        timeoutId = setTimeout(() => {
            fn(...args)
            timeoutId = null
        }, delay)
    }
}
