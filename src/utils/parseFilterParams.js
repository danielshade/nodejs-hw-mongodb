function parseContactType(contactType) {
    const isTypeString = typeof contactType === 'string';
  
    if (!isTypeString) return undefined;
  
    const isType = ['work', 'home', 'personal'].includes(contactType);
  
    if (!isType) return undefined;
  
    return contactType;
  }
  
  function parseIsFavourite(isFavourite) {
    const isFavouriteBoolen = typeof isFavourite === 'string';
  
    if (!isFavouriteBoolen) return undefined;
  
    return isFavourite;
  }
  
  export function parseFilterParams(query) {
    const { type, isFavourite } = query;
  
    const parsedContactType = parseContactType(type);
    const parsedIsFavourite = parseIsFavourite(isFavourite);
  
    return {
      type: parsedContactType,
      isFavourite: parsedIsFavourite,
    };
  }