export const convertingTagsToAnArray = (tags) => {
    let returnVal = ``;
    tags.forEach((element) => (returnVal += `"${element.title}", `));
    return returnVal;
}