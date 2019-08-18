// show tooltips for every elemet if conditions fulfilled:
// * styles, owerflow: hidden and text-owerflow: ellipsis
// * contains only text nodes
// * content doesn't fit

class Tooltips {
  constructor() {
    this.tooltipElem = document.createElement('div');
    const tooltipStyle = this.tooltipElem.style;

    // styles
    tooltipStyle.position = 'fixed';
    tooltipStyle.zIndex = '100';
    tooltipStyle.top = '0';
    tooltipStyle.left = '0';
    tooltipStyle.padding = '5px 10px';
    tooltipStyle.backgroundColor = '#707070';
    tooltipStyle.color = '#ffffff';
    tooltipStyle.fontSize = '14px';
    tooltipStyle.borderRadius = '4px';
    tooltipStyle.boxShadow = '2px 2px 2px 1px rgba(0, 0, 0, 0.2)';
    tooltipStyle.maxWidth = '50%';
    this.tooltipElem.style.visibility = 'hidden';

    document.body.appendChild(this.tooltipElem);
    this.isShoved = false;

    // handler for window
    this.timeout = 0;
    const handleMouseMove = e => {
      if (this.isShoved) this.hideTooltip();
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        if (!this.isNeedTooltip(e.target)) return;
        this.showTooltip(e);
      }, 300);
    };
    window.addEventListener('mousemove', handleMouseMove);
  }

  showTooltip(e) {
    this.tooltipElem.textContent = e.target.textContent;
    const coords = this.calcPosition(e);

    const tooltipStyle = this.tooltipElem.style;

    tooltipStyle.top = coords.y + 'px';
    tooltipStyle.left = coords.x + 'px';

    this.tooltipElem.style.visibility = 'visible';
    this.isShoved = true;
  }

  hideTooltip() {
    const tooltipStyle = this.tooltipElem.style;

    tooltipStyle.top = 0;
    tooltipStyle.left = 0;
    this.tooltipElem.textContent = '';

    tooltipStyle.visibility = 'hidden';
    this.isShoved = false;
  }

  isNeedTooltip(target) {
    const style = window.getComputedStyle(target);

    // check styles condition
    if (style.overflow !== 'hidden' || style.textOverflow !== 'ellipsis') {
      return false;
    }

    // check containing only text nodes condition
    if (target.children.length !== 0 || !target.textContent) {
      return false;
    }

    // check horisontal contet overflow condition
    if (target.clientWidth === target.scrollWidth) {
      return false;
    }

    // if all conditions are met
    return true;
  }

  calcPosition(e) {
    // edges offset
    const offset = 15;
    // mouse cursor offset
    const offsetY = 30;
    // small shift to left
    const offsetX = this.tooltipElem.offsetWidth * 0.25;

    let x = e.clientX - offsetX;
    let y = e.clientY + offsetY;

    // if too close to right edge
    if (this.tooltipElem.offsetWidth > window.innerWidth - x - offset) {
      x = window.innerWidth - this.tooltipElem.offsetWidth - offset;
    }

    // if too close to left edge
    if (x < offset) {
      x = offset;
    }

    // if too close to buttom
    if (this.tooltipElem.offsetHeight > window.innerHeight - y - offset) {
      const upTo = e.clientY - this.tooltipElem.offsetHeight - offset;
      y = upTo >= offset ? upTo : offset;
    }

    return { y, x };
  }
}

export default Tooltips;
