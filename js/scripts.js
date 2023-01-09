 var cor 
 var nomeUsuario 

 $('.btn-adicionar').click(function(){
    $(this).parent().children('.popup').show()
    $('.popup2').hide()
  })

  $('.btn-apagar').click(function(){
    $(this).parent().children('.item-cor').remove()
  })

$('.popup div').click(function(){
    cor = $(this).attr('class');
    $('.popup').hide();
    console.log($(this).parent().next())
    $(this).parent().next().show()
})

$('.popup2 div').click(function(){
    var area = $(this).parent().data('area')
    if($('.'+area+' .item-cor').length <3){
      $('.'+area).append('<div class="item-cor '+cor+' '+ $(this).data('size') +'"></div>')
      $(this).parent().hide();
    }
})

$('.add-hashtag').keypress(function (event) {
    if (event.which == 13) {
      var target = $(this).val();
      if (target.indexOf("#") != 0) {
        target = target;
      }

      var layout = '';
      layout += '<a class="hashtag" data-action="removeHashtag">\n';
      layout += '\t<span class="label-hashtag">' + target + '</span>';
      layout += '\t<button type="button" class="ico remove" data-action="removeHashtag">X</button>';
      layout += '\t<input type="hidden" name="Hashtags[]" value="' + target + '" />';
      layout += '</a>';

      
      $(this).parent().next().append(layout);
      
      $(this).val("");
      $(this).focus();
    }

  });

  $('select').change(function() {
    
      var target = $(this).val();
      
      var layout = '';
      layout += '<a class="hashtag" data-action="removeHashtag">\n';
      layout += '\t<span class="label-hashtag">' + target + '</span>';
      layout += '\t<button type="button" class="ico remove" data-action="removeHashtag">X</button>';
      layout += '\t<input type="hidden" name="Hashtags[]" value="' + target + '" />';
      layout += '</a>';
    
      if($(this).next().children().length == 0){ 
        $(this).next().append(layout);
      }
      $(this).val("");
      $(this).focus();
    

  });


  $("body").on("click", "[data-action='removeHashtag']", function () {
    if ($(this).hasClass("hashtag")) {
      $(this).remove();
    } else {
      $(this).parents(".hashtag").remove();
    }

  });

  $('.btn-avancar, .btn-voltar').click(function () {
    var target = $(this).children('a').attr('href')
    $('.pagina').hide();
    $(target).show();
  })

  $('.mapa .areas').click(function(){
    
    if ($(this).data('target') == undefined){
      return
    }

    if(!$(this).hasClass('active')){
        $('.popup, .popup2').hide()
    }
    $('.mapa .areas').removeClass('active')
    $('.mapa .areas').children('.btn-adicionar, .btn-apagar').hide()
    $(this).addClass('active')
    $(this).children('.btn-adicionar, .btn-apagar').show()

    var target = '#' + $(this).data('target')
    $('#pagina5 .table-target').html('');
    $('#pagina5 .table-target').removeClass('tabela');
    $('#pagina5 .table-target').prepend($(target).clone())
    $('#pagina5 .table-target').addClass('tabela');
  })

$(document).ready(function(){
  nomeUsuario = getUrlParameter();
})

  function getUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const msg = urlParams.get('contexto')
    return msg;
}

//codigo para gerar o pdf (me desculpe por isso)
document.getElementById('btPrint').addEventListener('click', function(){
  console.log('click')
  $('.progress').css('display', 'flex');
  $('#pagina5').hide();
  $('.table-target').hide();
  $('#pagina1').show();
  $('header').hide()
  $('.engloba-btn').hide()
  $('body').attr('style','background-image:unset;')
  $('#pagina1').prepend("<span style='font-size:16px'><strong>Aluno:</strong> " + nomeUsuario +"</span>")
  $('#pagina2').show()
  $('#pagina3').show()
  $('#pagina4').show()
  $('#pagina5').show()
  // javascript: print()

  // tentando tirar o jspdf da equacao
  html2canvas(document.body).then((canvas)=>{
    const base64image = canvas.toDataURL('image/png');
    window.location.href = base64image;
    // window.open(base64image, '_blank')
  })
  
  // comentando a função do canvas e substituindo pelo print() acima

  // html2canvas(document.body).then(function(canvas) {
  //    var a = canvas; //adm
  //    var b = a.toDataURL('image/png'); 
  //    console.log(b)
  //    var doc = new jsPDF('l', 'mm');
  //    doc.addImage(b, 'PNG', 0, -10, 300, 300*(9/16));
  //    doc.addPage()
     
  //   $('#pagina1').hide();
  //   $('#pagina2').show();
  //    html2canvas(document.body).then(function(canvas) {
  //      var c = canvas; //soldagem
  //      var d = c.toDataURL('image/png');
  //      console.log(d)
       
       
  //    doc.addImage(d, 'PNG', 0, -10, 300, 300*(9/16));
  //     doc.addPage()
  //     $('#pagina2').hide();
  //   });    
  //     $('#pagina3').show();
  //     $('#pagina2').hide();
  //     html2canvas(document.body).then(function(canvas) {
  //       var e = canvas;
  //       var f = e.toDataURL('image/png'); 
          
        
  //     doc.addImage(f, 'PNG', 0, -10, 300, 300*(9/16));
  //     doc.addPage()
  //     $('#pagina3').hide();
  //   });    
  //   $('#pagina4').show();
  //   $('#pagina3').hide();
  //   html2canvas(document.body).then(function(canvas) {
  //     var g = canvas;
  //     var h = g.toDataURL('image/png'); 
          
        
  //     doc.addImage(h, 'PNG', 0, -10, 300, 300*(9/16));
  //     doc.addPage()
  //     $('#pagina4').hide();
  //   }); 
  //       $('#pagina5').show();
  //       $('#pagina4').hide();
  //       html2canvas(document.body).then(function(canvas) {
  //         var i = canvas;
  //         var j = i.toDataURL('image/png'); 
          
        
  //         doc.addImage(j, 'PNG', 0, -10, 300, 300*(9/16));
  //         doc.save(nomeUsuario+'.pdf');   
  //         $('body').removeAttr('style')
  //         $('header').show()
  //         $('.engloba-btn').show()
  //         $('.progress').css('display', 'none');
  //       }); 
  // });             
})