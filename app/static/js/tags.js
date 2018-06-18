jQuery.fn.tag = function(options) {

	//default options
	var defaults = {
		seperator : ',',
		unique : true,
		addOnEnter : true,
		style : {
			list : 'taglist',
			item : 'tag',
			input : 'input',
			remove : 'delete'
		}
	};

	//options extends defaults
	options = jQuery.extend(defaults, options);

	//her element icin
	jQuery(this).each(function() {

		//eger data-seperator attribute'i varsa onu oncelkli say
		if ((seperator = jQuery(this).attr('data-seperator')) != '')
			options.seperator = seperator;

		//tag create eden fonksiyon
		var create_tag = function(text) {
			//trim yapalim
			var value = text.replace(/^\s+|\s+$/g, '');
			//eger deger yoksa cikis yap
			if (value == '')
				return;

			//her tag bir li tagidir
			var item = jQuery('<li/>').addClass(options.style.item);
			//bir tag su yapidadir: <li><span>tag</span><a tabindex=-1><span>[X]</span></a></li>
			var tag = jQuery('<span/>');
			var close_text = jQuery('<span/>').html('[X]');
			var close = jQuery('<a/>', {tabindex:'-1'}).addClass(options.style.remove).append(close_text).click(function() {
				//close'a basildiginda li tagini remove et
				jQuery(this).closest('li').remove();
				//input degerini tekrar duzenle
				update_input();
			});

			//eger unique option true ise ve daha once varsa cikis yap
			if (options.unique && jQuery.inArray(value, values) > -1) return;

			//degerler arrayina ekle
			values.push(value);
			//<li><span /></li> icerisine yazar
			tag.html(value);
			//tum li'yi construct eder
			item.append(tag).append(' ').append(close);

			//li elementini dondurur.
			return item;
		};

		//tag'i ul'ye ekleyen fonksiyon
		var add_tag = function(input) {
			//eger giris yapilan deger varsa
			if (jQuery(input).val() != '') {
				//tagi create et
				var item = create_tag(jQuery(input).val());
				//eger tag create edilemediyse
				if (!item)
				{
					//degerini sifirla ve genisligini kucult
					jQuery(input).val('');
					jQuery(input).width(8);
				}
				else {
					//eger ekleyebildiyse inputun bulundugu li'den once ekle
					jQuery(input).closest('li').before(item);
					//eger seperator eklendiyse sil
					jQuery(input).val(jQuery(input).val().replace(options.seperator, ''));
					//jQuery(input).closest('li').prev().after(jQuery(input).closest('li')); //buna gerek kalmadi

					//input'u kucult, sifirla ve odakla
					jQuery(input).width(8).val('').focus();
				}
				//degerleri tekrar duzenle
				update_input();
				//shadowu sifirla
				shadow.html('');
			}
		};

		//gercek inputun degerlerinin duzenlendigi fonksiyon
		var update_input = function() {
			//tag arrayi
			var tags = [];
			//her tag item icin
			jQuery('li.'+options.style.item+' > span', list).each(function() {
				//tagleri ekle
				tags.push(jQuery(this).html());
			});
			values = tags;
			//degerleri tekrar yaz.
			jQuery(input).val(tags.join(options.seperator));
		};

		//gercek input
		var input = jQuery(this);
		//eger inputsa
		if (input.is(':input')) {
			//gercek inputu gizle
			input.hide();
			//ul click oldugunda input'a odaklan
			var list = jQuery('<ul/>').addClass(options.style.list).click(function() {
				jQuery(this).find('input').focus();
			});
			//ekleyen input
			var add = jQuery('<input/>', {type: 'text'});
			//initial degerleri al
			var tags = input.val().split(options.seperator);
			var values = [];
			//initial degerleri uygula
			for (index in tags) {
				var item = create_tag(tags[index]);
				list.append(item);
			}
			//gercek inputu tekrar duzenle
			update_input();
			//ul'i gercek inputtan sonra ekle
			input.after(list);
			//input containeri olustur
			var input_container = jQuery('<li/>').addClass(options.style.input);
			//golgesini olustur, golge width'i almak icin kullanilacak
			var shadow = jQuery('<span/>');
			//golgeyi gizle
			shadow.hide();
			//input'u containere ekle
			input_container.append(add);
			//shadowu ekle
			add.after(shadow);
			//listeye ekle.
			list.append(input_container);

			//shadow'u kullanarak input'u gercek boyutuna cekiyoruz
			var auto_width = function(input)
			{
				//shadow'un icini dolduruyoruz, space'leri nbsp yapmamiz gerekiyor, sondaki ve bastaki bosluklar gelmiyor yoksa.
				shadow.html(jQuery(input).val().replace(/\s/g,'&nbsp;'));
				//sonda ne kadar free alan eklenecek? bosken 8 doluyken 10 iyi.
				var zone = (jQuery(input).val() == ''?8:10);
				//width'i uygula
				jQuery(input).width(shadow.width() + zone);
			};

			//onkeyup'da yalnizca width'i ayarla
			add.bind('keyup',function(){
				auto_width(this);
			})
			//onkeydown implementasyonu
			.bind('keydown', function(event) {
				//width
				auto_width(this);
				var key = event.keyCode || event.which;
				
				//eger bossa ve backspace'e basilmissa
				if (jQuery(this).val() == '' && (key == 8 || key==46)) //backspace or delete
				{
					//genislik ayarla
					jQuery(this).width(jQuery(this).val()!=''?shadow.width()+5:8);
					//inputun li'sinden bi onceki veya bi sonraki 'li'yi sil.
					switch (key)
					{
						//eger backspace ise onceki sil
						case 8: 
							if (jQuery(this).closest('li').prev().is('.ready-to-delete')) {
								jQuery('.ready-to-delete').removeClass('ready-to-delete');
								jQuery(this).closest('li').prev().remove();
							} else {
								jQuery('.ready-to-delete').removeClass('ready-to-delete');
								jQuery(this).closest('li').prev().addClass('ready-to-delete');
							}
						break;
						//eger delete ise sonraki sil
						case 46: 
							if (jQuery(this).closest('li').next().is('.ready-to-delete')) {
								jQuery('.ready-to-delete').removeClass('ready-to-delete');
								jQuery(this).closest('li').next().remove();
							} else {
								jQuery('.ready-to-delete').removeClass('ready-to-delete');
								jQuery(this).closest('li').next().addClass('ready-to-delete');
							}
						break;
					}
					
					//degerleri duzenle
					update_input();

					//false.
					event.preventDefault();
					return false;
				} else {
					jQuery('.ready-to-delete').removeClass('ready-to-delete');
				}

				//eger deger bossa
				if (jQuery(this).val() == '')
				{
					//yukari veya sola basilmissa
					if (key == 37 || key == 38) //left, up
					{
						//input li'sini yukari tasi
						jQuery(this).width(jQuery(this).val()!=''?shadow.width()+5:8);
						jQuery(this).closest('li').prev().before(jQuery(this).closest('li'));
						jQuery(this).focus();
					}

					//asagi veya saga basilmissa
					if (key == 39 || key == 40) //down, right
					{
						//input li'sini asagi tasi
						jQuery(this).width(jQuery(this).val()!=''?shadow.width()+5:8);
						jQuery(this).closest('li').next().after(jQuery(this).closest('li'));
						jQuery(this).focus();
					}
				}

			})
			//keypress'te
			.bind('keypress', function(event) {
				auto_width(this);
				var key = event.keyCode || event.which;
				//eger basilan tus seperator ise, veya addonenter option aciksa ve entere basilmissa
				if (options.seperator == String.fromCharCode(key) || options.seperator == key || (options.addOnEnter && key == 13)) {
					//tag ekle
					add_tag(this);
					//false
					event.preventDefault();
					return false;
				}
			})
			//blur oldugunda
			.bind('blur', function() {
				//eger tag yazildiysa ekle
				add_tag(this);
				//input ortalarda falansa diye, en sona atalim onu
				jQuery(this).closest('ul').append(jQuery(this).closest('li'));
			});
		}

	});

};