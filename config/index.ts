import BaseConfig from './config.base';
import ProdConfig from './config.prod';
import DevConfig from './config.dev';
import environment from './active.env';

let ExtraConfig = ProdConfig;

if (environment === 'staging') {
    ExtraConfig = DevConfig;
}

const Config: Partial<MagentoStoreConfig> = { ...BaseConfig, ...ExtraConfig };

export default Config;
