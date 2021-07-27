/**
 * 打印机管理应用配置
 * @author 孙恬静
 * @time 2018/05/23
 */
(function () {
    return {
        api: {
            // 获取用户列表数据（分页）
            'sysSearchPrinter': '/saa/printer/search',
            // 获取用户数据
            'sysPrinterFindByPk': '/saa/printer/find_by_pk/{id}',
            // 增加打印机
            'sysAddPrinter': '/saa/printer/create',
            // 激活禁用打印机
            'sysDeletePrinter': '/saa/printer/delete',
            'sysUpdatePrinter': '/saa/printer/update',
            // 校验Ip唯一性
            'validatePrinterIp': '/saa/printer/validate_Ip',
            // 获取可移交的打印机
            'sysFindAllPrinter': '/saa/printer/find_valid',
            // 根据选择的printer查找对应可选的slot
            'requestPrinterSlots': '/saa/printer/all_printer_slots/{id}',
            // 查找要移交的单证
            'findTransferDocuments': '/user/printer/all_documents/{printerId}',
            'findPrinterSlots': '/gg_code/find_list'
        },
        router: [{
            path: '/sys/saa/printer_app',
            component: Vue.gvUtil.getComponents('Home'),
            children: [{ // 打印机编辑
                path: 'printer_edit/index',
                name: 'printerAppPrinterEdit',
                component: function (resolve) {
                    require.async(['pages/sys/saa/printerApp/pages/printerEditIndex'], resolve);
                }
            }]
        }]
    };
})();
