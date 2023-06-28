import { Role, Token } from '@/types/index.types';

interface IEnum {
  role: Role[];
  token: {
    type: Token[];
  };
  refreshtoken: {
    role: Role[];
  };
}

export const ModelEnum: IEnum = {
  role: ['User', 'Admin', 'Merchant', 'Agent'],
  token: {
    type: ['forgot', 'reset', 'change', 'verify'],
  },
  refreshtoken: {
    role: ['User', 'Admin', 'Merchant', 'Agent'],
  },
};

export default ModelEnum;
