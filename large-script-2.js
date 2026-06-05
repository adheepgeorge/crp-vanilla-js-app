/**
 * Summary (CRP demo — script 2):
 * - Runs a long counting loop so the browser spends noticeable time on this file
 *   (for teaching / demos).
 * - Injects a <style> block and adds body class crp-large-style-on: header shows a
 *   pill via ::after ("Script 2 loaded: styles applied"), .card gets a dashed outline.
 * - Skips re-applying if #crp-large-script-2-style already exists.
 * - If the page is still loading, waits for DOMContentLoaded before apply(); otherwise
 *   runs apply() right away.
 */
;(function () {
  // More CPU work to make script execution noticeable in a waterfall
  let acc = 0
  for (let i = 1; i <= 2_000_000; i += 1) {
    acc = (acc + (i % 97)) % 1_000_003
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

  const apply = () => {
    if (document.getElementById('crp-large-script-2-style')) return

    const style = document.createElement('style')
    style.id = 'crp-large-script-2-style'
    style.textContent = css
    document.head.appendChild(style)

    document.body.classList.add('crp-large-style-on')
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true })
    return
  }

  apply()
})()
