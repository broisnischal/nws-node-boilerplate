import { Role, Token } from '@/types/index.types';

interface IEnum {
  token: {
    type: Token[];
  };
  refreshtoken: {
    role: Role[];
  };
}

export const ModelEnum: IEnum = {
  token: {
    type: ['forgot', 'reset', 'change', 'verify'],
  },
  refreshtoken: {
    role: ['User', 'Admin', 'Merchant', 'Agent'],
  },
};

export default ModelEnum;
