type OneObject<T> = { [x: string]: T };
type HandlerFeature = OneObject<boolean> | boolean;
type DeviceFeature = OneObject<HandlerFeature>;
type ConnectSchema = OneObject<DeviceFeature | boolean>;

const connectSchema: ConnectSchema = {
  'olt-odf': true,
  'odf-cable': true,
  'ork-ork': {
    'internal-external': {
      'left-left-splitter': true,
    },
    'internal-internal': {
      'left-right': true,
    },
  },
  'orsh-orsh': {
    'internal-external': {
      'left-left-splitter': true,
    },
    'internal-internal': {
      'left-right': true,
    },
  },
  'ork-cable': {
    'external-external': {
      'right-left': true,
    },
  },
  'cable-ork': {
    'external-external': {
      'right-left': true,
    },
  },
  'orsh-cable': {
    'external-external': {
      'right-left': true,
    },
  },
  'cable-orsh': {
    'external-external': {
      'right-left': true,
    },
  },
  'coupler-cable': {
    'external-splitter-external': {
      'right-left': true,
    },
  },
  'cable-coupler': {
    'external-external-splitter': {
      'right-left': true,
    },
  },
  'cable-cable': {
    'external-external': {
      'right-left': true,
      'left-right': true,
    },
  },
};

const deviceStart = 'orsh';
const deviceEnd = 'orsh';
const positionTypeStart = 'internal';
const positionTypeEnd = 'internal';
const sideStart = 'left';
const sideEnd = 'right';
  // returns => true


const devicePath = `${deviceStart}-${deviceEnd}`;
const handlerTypePath = `${positionTypeStart}-${positionTypeEnd}`;
 const sidePath = `${sideStart}-${sideEnd}`;

  //this path past in getVerifySchemeByPath()
  const path = `${devicePath}.${handlerTypePath}.${sidePath}`;

export const getVerifySchemeByPath = (pathName: string): boolean => {
  const paths = pathName.split('.');

  return paths.reduce((accObj, currPath, index, arr) => {
    const isObject = typeof accObj === 'object';
    const isLast = arr.length === index + 1;

    if (isObject) {
      return isLast ? !!accObj[currPath] : accObj[currPath];
    }

    return !!accObj;
  }, connectSchema as unknown as boolean);
};

// OLD Version
// type Process = (
//   start: string,
//   end: string,
//   handlerTypeStart?: string,
//   handlerTypeEnd?: string,
//   sideStart?: string,
//   sideEnd?: string,
// ) => boolean;

// const process: Process = (start, end, handlerTypeStart, handlerTypeEnd, sideStart, sideEnd): boolean => {
//   const connectDevices = `${start}-${end}`;
//   const connectHandlerType = `${handlerTypeStart}-${handlerTypeEnd}`;
//   const connectSides = `${sideStart}-${sideEnd}`;
//   const levelOne = connectSchema?.[connectDevices];
//   if (typeof levelOne === 'boolean') return levelOne;

//   const levelTwo = levelOne?.[connectHandlerType];

//   if (typeof levelTwo === 'boolean') return levelTwo;

//   const levelTrhee = levelTwo?.[connectSides];

//   return !!levelTrhee;
// };

// const isVerifyPath = process('ork', 'ork', 'internal', 'external', 'left', 'left-spliter');
