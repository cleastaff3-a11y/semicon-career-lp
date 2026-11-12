/* 半導体キャリア LP
 * 公開前に GAS_URL を、Google Apps Script のウェブアプリURL（https://script.google.com/macros/s/.../exec）に置き換えてください。
 */
(function () {
  'use strict';

  var GAS_URL = 'https://script.google.com/macros/s/ここにデプロイIDを貼る/exec';

  /* ---------- hero video ---------- */
  var vid = document.querySelector('#top video');
  if (vid) {
    try {
      vid.muted = true; vid.defaultMuted = true; vid.playsInline = true;
      var p = vid.play(); if (p && p.catch) p.catch(function () {});
    } catch (e) {}
  }

  /* ---------- experienced picker ---------- */
  var DATA = [
    { id: 'maint', label: '設備保全・メンテナンス', lead: '装置を止めずに動かし続ける力は、半導体工場でも求められます。点検やトラブル対応の経験は、装置まわりの仕事で活かせる場面があります。', positions: ['装置保全（メンテナンス）', '装置エンジニア（補助から）', '設備管理'], points: ['定期点検・部品交換の経験', 'トラブル時の原因調査・対応', '機械・電気の基礎知識'] },
    { id: 'elec', label: '電気・電子', lead: '半導体の製造装置や検査装置は、電気・電子の知識が土台です。図面を読み、計測器を扱ってきた経験が活かせます。', positions: ['装置エンジニア', '電気保全', '検査装置の調整・立ち上げ補助'], points: ['電気図面の読解', 'テスターなど計測器の扱い', '電気工事士などの資格'] },
    { id: 'cad', label: '機械設計・CAD', lead: '治具や設備の設計、図面の修正など、ものづくりを図面で支えてきた経験は、半導体の現場でも求められます。', positions: ['設計補助（CADオペレーター）', '治具・設備の設計', '生産技術'], points: ['2D／3D CADの操作', '図面作成・修正の経験', '部品・材料の選定知識'] },
    { id: 'qc', label: '品質管理・検査', lead: 'わずかな異常も見逃さないことが求められる半導体では、検査や品質管理の経験が活かしやすい分野です。', positions: ['品質管理', '外観・寸法検査', '品質保証の補助'], points: ['検査・測定の経験', '不良の原因分析・報告書作成', 'QC検定などの知識'] },
    { id: 'op', label: '製造オペレーター', lead: '決められた手順を守り、安定して生産を続けてきた経験は、半導体の製造現場でもそのまま強みになります。', positions: ['製造装置オペレーター', 'リーダー候補', '工程管理'], points: ['手順書どおりの正確な作業', '交替勤務の経験', '5S・安全への意識'] },
    { id: 'semi', label: '半導体業界', lead: '半導体工場や関連企業での経験がある方は、担当工程や装置の知識をそのまま活かせる求人をご案内できる場合があります。', positions: ['前工程・後工程の各職種', '装置エンジニア', '工程・品質の専門職'], points: ['クリーンルームでの勤務経験', '担当した工程・装置の知識', '業界のルール・用語の理解'] }
  ];
  var cur = 0;
  var SVGNS = 'http://www.w3.org/2000/svg';

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (text != null) e.textContent = text;
    return e;
  }
  function check() {
    var s = document.createElementNS(SVGNS, 'svg');
    s.setAttribute('width', '18'); s.setAttribute('height', '18'); s.setAttribute('viewBox', '0 0 18 18');
    s.setAttribute('aria-hidden', 'true'); s.setAttribute('style', 'flex: none; margin-top: 5px');
    var p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', 'M3 9.5l4 4 8-9'); p.setAttribute('fill', 'none'); p.setAttribute('stroke', '#7DE3FF'); p.setAttribute('style', 'stroke-width: 2');
    s.appendChild(p); return s;
  }
  function renderBg(i) {
    cur = i;
    var d = DATA[i];
    var btns = document.querySelectorAll('.bgbtn');
    for (var b = 0; b < btns.length; b++) btns[b].setAttribute('aria-pressed', String(b === i));
    var panel = document.getElementById('bg-panel');
    if (!panel) return;
    document.getElementById('bg-label').textContent = d.label;
    document.getElementById('bg-lead').textContent = d.lead;
    var pos = document.getElementById('bg-positions'); pos.textContent = '';
    d.positions.forEach(function (t) {
      var li = el('li', { style: 'display: flex; align-items: center; gap: 12px; font-weight: 700; font-size: 16px' });
      li.appendChild(el('span', { 'class': 'iri-bar', 'aria-hidden': 'true', style: 'width: 8px; height: 8px; border-radius: 2px; flex: none; display: block' }));
      li.appendChild(document.createTextNode(t));
      pos.appendChild(li);
    });
    var pts = document.getElementById('bg-points'); pts.textContent = '';
    d.points.forEach(function (t) {
      var li = el('li', { style: 'display: flex; align-items: flex-start; gap: 10px; font-size: 15px; color: #E3E7F0' });
      li.appendChild(check()); li.appendChild(document.createTextNode(t));
      pts.appendChild(li);
    });
    panel.classList.remove('fade'); void panel.offsetWidth; panel.classList.add('fade');
  }
  Array.prototype.forEach.call(document.querySelectorAll('.bgbtn'), function (btn) {
    btn.addEventListener('click', function () { renderBg(Number(btn.getAttribute('data-i'))); });
  });
  renderBg(0);

  /* 「経験者として応募」→ 経験欄を選択してフォームへ */
  Array.prototype.forEach.call(document.querySelectorAll('[data-apply-exp]'), function (a) {
    a.addEventListener('click', function () {
      var v = DATA[cur].id === 'semi' ? 'semi' : 'mfg';
      var r = document.querySelector('#apply-form input[name="exp"][value="' + v + '"]');
      if (r) r.checked = true;
    });
  });

  /* ---------- forms ---------- */
  var loadedAt = Date.now();
  var TEL_RE = /^0\d{1,4}-?\d{1,4}-?\d{3,4}$/;
  var MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function val(form, name) {
    var f = form.elements[name];
    if (!f) return '';
    if (f.length !== undefined && f.tagName !== 'SELECT') { // radio group
      for (var i = 0; i < f.length; i++) if (f[i].checked) return f[i].value;
      return '';
    }
    if (f.type === 'checkbox') return f.checked ? 'yes' : '';
    return String(f.value || '').trim();
  }
  function mark(form, name, bad) {
    var f = form.elements[name];
    if (!f) return;
    if (f.length !== undefined && f.tagName !== 'SELECT') {
      for (var i = 0; i < f.length; i++) f[i].setAttribute('aria-invalid', bad ? 'true' : 'false');
      var lab = f[0].closest('fieldset');
      if (lab) lab.style.outline = bad ? '2px solid #B3261E' : '';
      if (lab) lab.style.outlineOffset = bad ? '6px' : '';
      lab && (lab.style.borderRadius = '12px');
    } else {
      f.setAttribute('aria-invalid', bad ? 'true' : 'false');
    }
  }
  function normTel(t) {
    return t.replace(/[０-９]/g, function (c) { return String.fromCharCode(c.charCodeAt(0) - 0xFEE0); })
            .replace(/[\u2010-\u2015\u2212\u30FC\uFF0D\uFE63]/g, '-').replace(/\s/g, '');
  }

  function validate(form, kind) {
    var errs = [];
    function need(name, ok, msg) { mark(form, name, !ok); if (!ok) errs.push(msg); }
    need('name', val(form, 'name').length > 0, 'お名前を入力してください。');
    if (kind === 'apply') {
      var tel = normTel(val(form, 'tel'));
      need('tel', TEL_RE.test(tel), '電話番号を正しく入力してください（例：090-0000-0000）。');
      var age = val(form, 'age');
      need('age', age === '' || (/^\d{1,2}$/.test(age) && +age >= 15 && +age <= 80), '年齢は数字で入力してください。');
      need('exp', val(form, 'exp') !== '', 'ご経験を選択してください。');
    } else {
      need('email', MAIL_RE.test(val(form, 'email')), 'メールアドレスを正しく入力してください。');
      var ct = normTel(val(form, 'tel'));
      need('tel', ct === '' || TEL_RE.test(ct), '電話番号を正しく入力してください。');
      need('body', val(form, 'body').length > 0, 'お問い合わせ内容を入力してください。');
    }
    need('agree', val(form, 'agree') === 'yes', '個人情報の取り扱いへの同意が必要です。');
    return errs;
  }

  function payload(form, kind) {
    var p = { kind: kind, website: val(form, 'website'), elapsed: Date.now() - loadedAt, name: val(form, 'name') };
    if (kind === 'apply') {
      p.tel = normTel(val(form, 'tel')); p.age = val(form, 'age'); p.area = val(form, 'area');
      p.exp = val(form, 'exp'); p.start = val(form, 'start'); p.status = val(form, 'status');
    } else {
      p.email = val(form, 'email'); p.tel = normTel(val(form, 'tel'));
      p.type = val(form, 'type'); p.body = val(form, 'body');
    }
    p.agree = 'yes';
    return p;
  }

  function showDone(form, kind) {
    var box = el('div', { 'class': 'done', tabindex: '-1' });
    box.appendChild(el('h3', null, kind === 'apply' ? 'ご応募ありがとうございます' : 'お問い合わせありがとうございます'));
    box.appendChild(el('p', null, kind === 'apply'
      ? '内容を確認のうえ、担当者よりお電話でご連絡いたします。しばらくお待ちください。'
      : '内容を確認のうえ、担当者よりご連絡いたします。'));
    form.textContent = '';
    form.appendChild(box);
    box.focus();
  }

  function setup(form) {
    var kind = form.getAttribute('data-kind');
    var msg = form.querySelector('.form-msg');
    var btn = form.querySelector('.submit');
    var sending = false;
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      if (sending) return;
      var errs = validate(form, kind);
      if (errs.length) {
        msg.textContent = errs.join(' ');
        var first = form.querySelector('[aria-invalid="true"]');
        if (first) first.focus();
        return;
      }
      msg.textContent = '';
      sending = true; btn.disabled = true;
      var label = btn.textContent; btn.textContent = '送信中…';
      fetch(GAS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload(form, kind)),
        redirect: 'follow',
        credentials: 'omit'
      }).then(function (r) { return r.json(); })
        .then(function (res) {
          if (res && res.ok) { showDone(form, kind); return; }
          throw new Error((res && res.error) || 'failed');
        })
        .catch(function () {
          msg.textContent = '送信できませんでした。通信環境をご確認のうえ、時間をおいてもう一度お試しください。';
          sending = false; btn.disabled = false; btn.textContent = label;
        });
    });
    form.addEventListener('input', function (ev) {
      if (ev.target && ev.target.getAttribute('aria-invalid') === 'true') ev.target.setAttribute('aria-invalid', 'false');
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('form[data-kind]'), setup);

  /* モーダル（お問い合わせ）を Esc で閉じる */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && location.hash === '#contact') location.hash = '';
  });
})();
