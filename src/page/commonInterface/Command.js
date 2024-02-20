
const Command = {
    ApprovalSign() {
        return false;
    },
    FullWidthHeight(id, _heigth, callback) {
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        var $print = document.querySelector(id);
        if (width > height) {
            if (_heigth) {
                height -= _heigth;
            }
            $print.style.width = width + 'px';
            $print.style.height = height + 'px';
            //$print.style.transform = 'none';
            //$print.style.transformOrigin = '50% 50%';
        }
        else {
            if (_heigth) {
                width -= _heigth;
            }
            $print.style.width = height + 'px';
            $print.style.height = width + 'px';
            //$print.style.top = ((height - width) / 2) + 'px';
            //$print.style.left = (0 - (height - width) / 2) + 'px';
            //$print.style.transform = 'rotate(90deg)';
            //$print.style.transformOrigin = '50% 50%';
        }
        $print.style.top = 0 + 'px';
        $print.style.left = 0 + 'px';
        if (callback) {
            callback();
        }
    },
    CheckIsX() {
        var width = document.documentElement.clientWidth;
        var height = document.documentElement.clientHeight;
        if (width > height) {
            return true;
        } else {
            return false;
        }
    },
    rotateBase64Img(src, edg, callback) {

        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");

        var imgW;//图片宽度
        var imgH;//图片高度
        var size;//canvas初始大小

        if (edg % 90 != 0) {
            edg = 90;
        }
        (edg < 0) && (edg = (edg % 360) + 360)
        const quadrant = (edg / 90) % 4; //旋转象限
        const cutCoor = { sx: 0, sy: 0, ex: 0, ey: 0 }; //裁剪坐标

        var image = new Image();
        image.crossOrigin = "anonymous"
        image.src = src;

        image.onload = function () {

            imgW = image.width;
            imgH = image.height;
            size = imgW > imgH ? imgW : imgH;

            canvas.width = size * 2;
            canvas.height = size * 2;
            switch (quadrant) {
                default:
                case 0:
                    cutCoor.sx = size;
                    cutCoor.sy = size;
                    cutCoor.ex = size + imgW;
                    cutCoor.ey = size + imgH;
                    break;
                case 1:
                    cutCoor.sx = size - imgH;
                    cutCoor.sy = size;
                    cutCoor.ex = size;
                    cutCoor.ey = size + imgW;
                    break;
                case 2:
                    cutCoor.sx = size - imgW;
                    cutCoor.sy = size - imgH;
                    cutCoor.ex = size;
                    cutCoor.ey = size;
                    break;
                case 3:
                    cutCoor.sx = size;
                    cutCoor.sy = size - imgW;
                    cutCoor.ex = size + imgH;
                    cutCoor.ey = size + imgW;
                    break;
            }


            ctx.translate(size, size);
            ctx.rotate(edg * Math.PI / 180);
            ctx.drawImage(image, 0, 0);

            var imgData = ctx.getImageData(cutCoor.sx, cutCoor.sy, cutCoor.ex, cutCoor.ey);
            if (quadrant % 2 == 0) {
                canvas.width = imgW;
                canvas.height = imgH;
            } else {
                canvas.width = imgH;
                canvas.height = imgW;
            }
            ctx.putImageData(imgData, 0, 0);
            callback(canvas.toDataURL());
        };
    }
}

export default Command;