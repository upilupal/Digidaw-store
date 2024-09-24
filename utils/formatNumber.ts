export const formatNumber = (digit: number) => {
    return new Intl.NumberFormat('id-ID').format(digit)
}