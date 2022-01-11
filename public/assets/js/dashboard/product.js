// $(document).ready(function (){
//     images.onchange = evt => {
//         const [file] = images.files
//         if(file) {
//             imagePreview.src = URL.createObjectURL(file)
//         }
//     }
// })

$(document).ready(function () {
    ImgUpload();

    HandleCategory();
});

function HandleCategory() {
    $('#productBrand').select2({
        tags: true,
        createTag: function (params) {
            return {
                id: params.term,
                text: params.term,
                newOption: true
            }
        },
        templateResult: function (data) {
            var $result = $("<span></span>");

            $result.text(data.text);

            if (data.newOption) {
                $result.append(" <em>(mới)</em>");
            }

            return $result;
        }
    })
    $('#firstLevelCat').select2();
    $('#secondLevelCat').prop('disabled', true).select2();
    $('#threeLevelCat').prop('disabled', true).select2();

    $('#firstLevelCat').change(function () {
        const parentCat = $(this).val();
        if(parentCat.length === 24) {
            $.get('/vendors/api/categories/' + parentCat, (data, status) => {
                let list = [$('<option>', { text: 'Hãy lựa chọn danh mục', disabled: true, selected: true, hidden: true })]
                $('#threeLevelCat').empty().append(list).prop('disabled', true);

                list.push(...data.map(x => $('<option>', {
                    text: x.name,
                    value: x._id,
                })))

                $('#secondLevelCat').empty().append(list).prop('disabled', false);
            })
        }
    })
    $('#secondLevelCat').change(function () {
        const parentCat = $(this).val();
        if(parentCat.length === 24) {
            $.get('/vendors/api/categories/' + parentCat, (data, status) => {
                let list = [$('<option>', { text: 'Hãy lựa chọn danh mục', disabled: true, selected: true })]
                list.push(...data.map(x => $('<option>', {
                    text: x.name,
                    value: x._id,
                })))

                $('#threeLevelCat').empty().append(list).prop('disabled', false);
            })
        }
    })
    // parentCat.onchange = (e) => {
    //     console.log
    // }
}

function ImgUpload() {
    var imgWrap = "";
    var imgArray = [];

    $('.upload__inputfile').each(function () {
        $(this).on('change', function (e) {
            imgWrap = $(this).closest('.upload__box').find('.upload__img-wrap');
            var maxLength = $(this).attr('data-max_length');

            var files = e.target.files;
            var filesArr = Array.prototype.slice.call(files);
            var iterator = 0;
            filesArr.forEach(function (f, index) {

                if (!f.type.match('image.*')) {
                    return;
                }

                if (imgArray.length > maxLength) {
                    return false
                } else {
                    var len = 0;
                    for (var i = 0; i < imgArray.length; i++) {
                        if (imgArray[i] !== undefined) {
                            len++;
                        }
                    }
                    if (len > maxLength) {
                        return false;
                    } else {
                        imgArray.push(f);

                        let reader = new FileReader();
                        reader.onload = function (e) {
                            let html = "<div class='upload__img-box'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".upload__img-close").length + "' data-file='" + f.name + "' class='img-bg'><div class='upload__img-close'></div></div></div>";
                            imgWrap.append(html);
                            iterator++;
                        }
                        reader.readAsDataURL(f);
                    }
                }
            });
        });
    });

    $('body').on('click', ".upload__img-close", function (e) {
        var file = $(this).parent().data("file");
        for (var i = 0; i < imgArray.length; i++) {
            if (imgArray[i].name === file) {
                imgArray.splice(i, 1);
                break;
            }
        }
        $(this).parent().parent().remove();
    });
}