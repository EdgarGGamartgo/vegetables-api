 export const formatDate = (englishDate) => {
    let dates = englishDate.split('/')
    return `${dates[1]}/${dates[0]}/${dates[2]}`
}
