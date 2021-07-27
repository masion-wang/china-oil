/**
 * 消息
 * @author 黄景华
 * @time 2018/01/17
 */
(function () {
    return {
        api: {
            'findGgCompanyList': '/saa/company/search',
            'ggCompanyFindByPk': '/saa/company/find_by_pk/{companyCode}',
            'ggCompanyDeleteByPk': '/saa/company/delete',
            'saveGgCompany': '/saa/company/save',
            'updateGgCompany': '/saa/company/update',
            // 根据table加载对应的tree
            'treeSearch': '/gg_code/get_tree',
            'validateCompanyCode': '/saa/company/validate_code'
        }
    }
})();
