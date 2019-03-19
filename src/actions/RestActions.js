import {
    MAGENTO_INIT,
    MAGENTO_GET_CATEGORY_TREE,
} from '../actions/types'

export const initMagento = () => ({
    type: MAGENTO_INIT
})

export const getCategoryTree = () => ({
    type: MAGENTO_GET_CATEGORY_TREE,
})