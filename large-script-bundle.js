/**
 * Bundled CRP demo: equivalent outcome to large-script-1.js + large-script-2.js.
 * Heavy CPU is deferred with requestIdleCallback (or setTimeout) so the browser
 * can paint above-the-fold content before this work runs — improves FCP/LCP vs
 * running the same loops synchronously on the critical path.
 */
;(function () {
  const scheduleDeferredWork = (callback) => {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(callback, { timeout: 2000 })
      return
    }
    setTimeout(callback, 0)
  }

  scheduleDeferredWork(() => {
    const values = []
    for (let i = 0; i < 250_000; i += 1) {
      values.push((i * 17) % 1009)
    }

    let checksum = 0
    for (let i = 0; i < values.length; i += 1) {
      checksum = (checksum + values[i]) % 10_000_019
    }

    let acc = 0
    for (let i = 1; i <= 2_000_000; i += 1) {
      acc = (acc + (i % 97)) % 1_000_003
    }

    void (checksum + acc)

    const header = document.querySelector('header')
    if (header) {
      const existing = document.getElementById('crp-script-1-status')
      if (existing) {
        existing.textContent = 'Script 1 is ready: UI hydrated'
      } else {
        const el = document.createElement('p')
        el.id = 'crp-script-1-status'
        el.className = 'subtitle'
        el.textContent = 'Script 1 is ready: UI hydrated'
        header.appendChild(el)
      }
    }

    if (document.getElementById('crp-large-script-2-style')) {
      return
    }

    const css = `
  body.crp-large-style-on header {
    position: relative;
  }

  body.crp-large-style-on header::after {
    content: "Script 2 loaded: styles applied";
    display: inline-block;
    margin-top: 0.75rem;
    padding: 0.5rem 0.75rem;
    border-radius: 9999px;
    border: 1px solid rgba(44, 62, 80, 0.25);
    background: rgba(255, 255, 255, 0.85);
    color: #2c3e50;
    font-size: 0.95rem;
  }

  body.crp-large-style-on .card {
    outline: 2px dashed rgba(46, 204, 113, 0.55);
    outline-offset: 4px;
  }
  `

    const style = document.createElement('style')
    style.id = 'crp-large-script-2-style'
    style.textContent = css
    document.head.appendChild(style)

    document.body.classList.add('crp-large-style-on')
  })
})()
