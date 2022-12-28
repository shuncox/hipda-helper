///////////////////////////////////////////////////////////////////////
// 默认选项

var defaultConfig = {
    enableBlacklist: true,
    pageWidth: "100%",
    goodboySee: true,
    blockBSTop: true,
    highlightOP: true,
    enableShortcut: false,
    pagePreview: false
}

// 不太优雅的clone方式
var currentConfig = JSON.parse(JSON.stringify(defaultConfig));

///////////////////////////////////////////////////////////////////////
// 初始化所有UI

function showOption(currentConfig) {

    $('[id^=toggle_]').bootstrapSwitch('state', false);

    var manifestData = chrome.runtime.getManifest();

    $('#vernumber').text('Hi-PDA Helper ' + manifestData.version);
    $('.bootstrap-switch-wrapper').addClass('float-right');

    //下面开始根据配置文件改变UI显示

    if (currentConfig.enableBlacklist) {
        $('#toggle_blacklist').bootstrapSwitch('state', true);
    }
    if (currentConfig.goodboySee) {
        $('#toggle_goodboy').bootstrapSwitch('state', true);
    }
    if (currentConfig.blockBSTop) {
        $('#toggle_BSTop').bootstrapSwitch('state', true);
    }
    if (currentConfig.highlightOP) {
        $('#toggle_highlightop').bootstrapSwitch('state', true);
    }
    if (currentConfig.enableShortcut) {
        $('#toggle_shortcut').bootstrapSwitch('state', true);
    }
    // 试验性预览功能
    if (currentConfig.pagePreview) {
        $('#toggle_pagepreview').bootstrapSwitch('state', true);
    }

    $('#btnpageWidth').text(currentConfig.pageWidth);

}

///////////////////////////////////////////////////////////////////////
// 根据用户操作改变UI

function userChangeOption(currentConfig) {

    $('#toggle_blacklist').on('switchChange.bootstrapSwitch', function (event, state) {
        currentConfig.enableBlacklist = state;
        // console.log(currentConfig);
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    });

    $('#toggle_goodboy').on('switchChange.bootstrapSwitch', function (event, state) {
        currentConfig.goodboySee = state;
        // console.log(currentConfig);
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    });

    $('#toggle_BSTop').on('switchChange.bootstrapSwitch', function (event, state) {
        currentConfig.blockBSTop = state;
        // console.log(currentConfig);
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    });

    $('#toggle_highlightop').on('switchChange.bootstrapSwitch', function (event, state) {
        currentConfig.highlightOP = state;
        // console.log(currentConfig);
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    });

    $('#toggle_shortcut').on('switchChange.bootstrapSwitch', function (event, state) {
        currentConfig.enableShortcut = state;
        // console.log(currentConfig);
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    });

    // 试验性预览功能
    $('#toggle_pagepreview').on('switchChange.bootstrapSwitch', function (event, state) {
        currentConfig.pagePreview = state;
        // console.log(currentConfig);
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    });

    $('.droppagewidth>a').click(function () {
        $('#btnpageWidth').text($(this).text());
        currentConfig.pageWidth = $(this).text();
        // console.log(currentConfig);
        console.log('2' + currentConfig.pageWidth);
        currentConfig.pageWidth = $('#btnpageWidth').text()
        chrome.storage.local.set({ 'extentionConfig': currentConfig });
    })

}

///////////////////////////////////////////////////////////////////////
// 恢复默认配置

function backToDefault(defaultConfig) {

    $('#backToDefault').click(function () {
        if (confirm("您确认要恢复默认设置吗？") == true) {
            currentConfig = JSON.parse(JSON.stringify(defaultConfig));
            showOption(defaultConfig);
            chrome.storage.local.set({ 'extentionConfig': defaultConfig });
            console.log('1' + currentConfig.pageWidth);
        }
    });

}

$(function () {

    chrome.storage.local.get('extentionConfig', function (obj) {

        if (typeof obj.extentionConfig == 'undefined') {
            chrome.storage.local.set({ 'extentionConfig': defaultConfig });
        }

        if (typeof obj.extentionConfig !== 'undefined') {
            currentConfig = obj.extentionConfig;
        }

        showOption(currentConfig);
        userChangeOption(currentConfig);
        
        //confirmChange(currentConfig);
        backToDefault(defaultConfig);
        
        console.log(currentConfig);

        // 折叠特效
        $('#collapse_more').on('show.bs.collapse', function () {
            $(this).siblings('.col-heading').addClass('active');
        });
        $('#collapse_more').on('hide.bs.collapse', function () {
            $(this).siblings('.col-heading').removeClass('active');
        });

    });

/*
    var bg = chrome.extension.getBackgroundPage();
    if (bg.hasnewpm) {
        $('#notifybox').show();
        $('#notifybox').click(bg.dismissNotify);
        bg.hasnewpm = false;
    }
*/
});
