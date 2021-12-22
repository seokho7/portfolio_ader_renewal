//back_button
var backBtn = $('header .back_btn')
backBtn.click((e)=> {
  e.preventDefault();
  if(history.length > 1){
    window.history.back();
  }

});

if($('.main_banner').length > 0){
  backBtn.css({display:'none'})
}else{
  backBtn.css({display:'block'})
}

// home_store_slide
if ($('.sh_swiper').length > 0) {
  var swiper = new Swiper(".home_store_slide", {
    pagination: {
      el: ".swiper-pagination",
      type: "progressbar"
    }
  });
  
  //home_store_slide change Img
var storeList = $('.home_store > ul li')
var targetUl = $('.home_store .home_store_slide > ul');
var targetUlPager = $('.home_store_slide .swiper-pagination *');
var targetList = targetUl.find('> li');

storeList.each(function () {
  $(this).click(() => {
    $(this).addClass('current').siblings().removeClass('current')
    var indexNum = $(this).index()
    targetUl.css({ transform: 'translate3d(0px,0,0)' })
    targetUlPager.css({transform:'translate3d(0px, 0px, 0px) scaleX(0.2) scaleY(1)'})
    targetList.each(function () {
      let targetImg = $(this).find('img')
      targetImg.attr('src', `../images/store-slide${indexNum + 1}-${$(this).index() + 1}.jpg`)
    });
  });
});
  
  
//collabo tab_slide
var swiper2 = new Swiper("#kitsune_collabo", {
  slidesPerView: '4',
  loop: true,
  spaceBetween: 20
  });
//detail_slide
var swiper3 = new Swiper(".detail_silde", {
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction"
  }
});
  
    //buy_area hide
var $option = $('.detail_silde .detail_option > select');
var hideArea =  $('.buy_area');
var hideBtn = hideArea.find('> .close');

$option.change(function(){
  hideArea.css({height: '229px'})
});

hideBtn.click(function(){
  hideArea.css({height: 0})
});
}

if ($('.sh_slick').length > 0) {
  var produtList = $('.product_tab_menu .product_tab_list')
  var showList = $('.product_tab_menu .tab_content > ul')
  var targetSubList = showList.find('li a')
  //product_list slide
  produtList.slick({
    dots: false,
    arrows: false,
    variableWidth: true,
    infinite: true
  });

  produtList.find('li a').each(function (e) {
    $(this).click(function (e) {
      e.preventDefault();
      var getId = $(this).parent().attr('id')
      
      showList.each(function () {
        var myClass = $(this).attr('class')
        if (getId == myClass) {
          showList.removeClass('show')
          $(this).addClass('show')
          $(this).find('>li')
          $(this).find('>li:first-child a').addClass('active')
        }
      });
    });
    
  });
    
  targetSubList.click(function (e) {
    e.preventDefault();
    targetSubList.removeClass('active');
    $(this).addClass('active');
    
  });




}

//home_nav
var navTT = $('.home_nav li a');
var navTarget = $('.home_nav .active_bar');
var currentUrl = location.href
navTT.each(function () {
  let navHref = ($(this).attr('href'))
  if (currentUrl.search(navHref) > -1) {
    navTT.removeClass('active')
    $(this).addClass('active')
    var navActive = navTT.filter('.active')
    var navActiveLeft = navActive.offset().left + 'px';
    var navActiveWidth = navActive.outerWidth() + 'px';
    navTarget.css({ left: navActiveLeft, widht: navActiveWidth})
    navTarget.text(navActive.text())
  }

  
});
  
//aisde open
var body = $('body')
var asideArea = $('aside.side_menu');
var asideBtn = $('.open_aside');
var sideCloseBtn = asideArea.find('.side_close')

asideBtn.click(function (e) {
  e.preventDefault();
  asideArea.add(body).toggleClass('open')
  searchArea.removeClass('open')
});

sideCloseBtn.click(function () {
  asideArea.add(body).removeClass('open')

  
});

//saerch open
var searchArea = $('aside.search_area')
var saerchBtn = $('.open_search');
var saerchCloseBtn = searchArea.find('.search_close');

saerchBtn.click(function (e) {
  e.preventDefault();
  searchArea.toggleClass('open')
  asideArea.add(body).removeClass('open')
  if (searchArea.hasClass('open')) {
    searchArea.find('input').focus()
  } else {
    searchArea.find('input').blur()
  }
});


saerchCloseBtn.click(function () {
  searchArea.removeClass('open')
});





//kakao 

var kakaoAdrees = $('#open_addres')

kakaoAdrees.click(sample6_execDaumPostcode);
function sample6_execDaumPostcode() {
  new daum.Postcode({
      oncomplete: function(data) {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

          // 각 주소의 노출 규칙에 따라 주소를 조합한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          var addr = ''; // 주소 변수
          var extraAddr = ''; // 참고항목 변수

          //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
          if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
              addr = data.roadAddress;
          } else { // 사용자가 지번 주소를 선택했을 경우(J)
              addr = data.jibunAddress;
          }

          // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
          if(data.userSelectedType === 'R'){
              // 법정동명이 있을 경우 추가한다. (법정리는 제외)
              // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
              if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                  extraAddr += data.bname;
              }
              // 건물명이 있고, 공동주택일 경우 추가한다.
              if(data.buildingName !== '' && data.apartment === 'Y'){
                  extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
              }
              // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
              if(extraAddr !== ''){
                  extraAddr = ' (' + extraAddr + ')';
              }
              // 조합된 참고항목을 해당 필드에 넣는다.
              document.getElementById("sample6_extraAddress").value = extraAddr;
          
          } else {
              document.getElementById("sample6_extraAddress").value = '';
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          document.getElementById('sample6_postcode').value = data.zonecode;
          document.getElementById("sample6_address").value = addr;
          // 커서를 상세주소 필드로 이동한다.
          document.getElementById("sample6_detailAddress").focus();
      }
  }).open();
}


//sign_up_placeholder

var inputTarget =$('.sign_section form .field input');
var pwd = $('#user_pwd')
var pwdCheck = $('#user_pwd_check')

inputTarget.each(function(){
  
  var targetPH = $(this).attr('placeholder');
  $(this).focus(function(){
    $(this).attr('placeholder','');
    $(this).css({borderColor:'var(--highlight-color)'})
  });
  $(this).blur(function(){
    $(this).attr('placeholder',targetPH);
    $(this).css({borderColor:'var(--hide-color)'})

    if(($(this).val().length >= 1) ){
      $(this).css({borderColor:'var(--highlight-color)'})

      if(pwd.val() != pwdCheck.val()){
        pwdCheck.css({borderColor:'var(--hide-color)'});
      }
    }
  });
});
