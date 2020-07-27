$(function () {

	// 只监听标题包含 phpMyAdmin 的页面
	if (document.title.indexOf("phpMyAdmin") == -1) {
		return;
	}

	var $table = $('table.table_results');
	var oldContent = $table.text() + $table.data('uniqueid');

	// 转换
	function transform() {
		$('table.table_results').find('td').each(function () {
			var value = $(this).text();

			// 字段类型判断
			if ($(this).data('type') != 'int') {
				return;
			}

			// 只对以1开头的10位数的单元格进行转换
			if (!/^1\d{9}$/.test(value)) {
				return;
			}

			var date = new Date(value * 1000);
			var content = formatDate(date);
			var thisClass = 'time2date' + randomString(10);

			var thisStyle = `
				<style id="${thisClass}">
					td.${thisClass}:after {
						position: absolute;
						top: 50%;
						left: 2px;
						margin-top: -11px;
						background: #03a9f42e;
						display: block;
						width: 138px;
						height: 22px;
						line-height: 22px;
						text-align: center;
						border-radius: 2px;
						right: 100%;
						font-style: normal;
						content: "${content}";
					}
				</style>`;

			$(this).css({ position: 'relative', 'min-width': '232px', 'box-sizing': 'border-box' }).addClass(thisClass);
			$(document.body).append(thisStyle);
		});
	}

	// 重置
	function reset() {
		$('table.table_results').find('td').each(function () {
			var classes = $(this).attr('class').split(' ');

			for (var i in classes) {
				if (/^time2date/.test(classes[i])) {
					// 移除旧样式表
					$('#' + classes[i]).remove();
					// 移除旧样式名称
					$(this).css({ position: 'static', 'min-width': 'auto' }).removeClass(classes[i]);
				}
			}
		});
	}

	// 自动转换
	chrome.storage.local.get(['auto_transform'], function (result) {
		if (result.auto_transform) {
			transform();

			setInterval(function () {
				var $table = $('table.table_results'); // table会销毁和动态创建，不能通过外部变量缓存
				var nowContent = $table.text() + $table.data('uniqueid');
				if (oldContent != nowContent) {
					oldContent = nowContent;
					reset();
					transform();
				}
			}, 1000);
		}
	});

	// Ctrl + 鼠标左键， 或 Alt + 鼠标左键
	$(document.body).mousedown(function (event) {
		if (event.ctrlKey && event.which == 1) {
			reset();
			transform();
		}

		if (event.altKey && event.which == 1) {
			reset();
		}
	});

	/**
	 * 产生随机字符串
	 * @param {Integer} len 
	 * @return {String}
	 */
	function randomString(len) {
		len = len || 32;
		var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var maxPos = chars.length;
		var str = '';
		for (var i = 0; i < len; i++) {
			str += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return str;
	}

	/**
	 * 将时间差转换成日期格式
	 * @param {Date} now 
	 * @return {String}
	 */
	function formatDate(now) {
		var year = now.getFullYear();
		var month = now.getMonth() + 1;
		var date = now.getDate();
		var hour = now.getHours();
		var minute = now.getMinutes();
		var second = now.getSeconds();

		month = month < 10 ? '0' + month : month;
		date = date < 10 ? '0' + date : date;
		hour = hour < 10 ? '0' + hour : hour;
		minute = minute < 10 ? '0' + minute : minute;
		second = second < 10 ? '0' + second : second;

		return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	}
});