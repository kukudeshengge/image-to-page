import createMenu from './createMenu'
import './menu.less'
import Base from '../plugins/Base'
import { getMenuFunc } from '../utils/utils'

class Menu extends Base {
  menuEl = null
  object = null
  objectBoundingRect = null
  
  constructor (...props) {
    super(...props)
    this.initEvent()
  }
  
  initEvent () {
    this.canvas.on('mouse:down', e => {
      if (e.button !== 3) return this.removeMenu()
      this.renderMenu(e)
    })
  }
  
  renderMenu (e) {
    const { x, y } = e.pointer
    const menus = this.getMenu(e)
    if (!menus || !menus.length || this.menuEl) return
    this.object = e.target
    this.objectBoundingRect = e.target.getBoundingRect(true)
    if (e.target && e.target.id !== 'workspace') {
      this.canvas.setActiveObject(e.target).renderAll()
    }
    this.menuEl = document.createElement('div')
    this.menuEl.className = 'pos-menu'
    this.menuEl.innerHTML = `<ul>${menus.map(item => {
      const id = item.children ? '' : item.id
      return `<li data-id="${id}">
        <span data-id="${id}">${item.text}</span>
        <span data-id="${id}">${item.keyboard || ''}</span>
        ${
        item.children ? ` <ul class="pos-menu">
            ${item.children?.map(item => `<li data-id="${item.id}">
              <span data-id="${item.id}">${item.text}</span>
              <span data-id="${item.id}">${item.keyboard || ''}</span>
          </li>`).join(' ')}
          </ul>` : ''
      }
    </li>`
    }).join(' ')}</ul>`
    this.menuEl.style.left = `${x}px`
    const height = menus.length * 30
    let top = y - (height / 2)
    if (top < 10) top = 10
    const canvasHeight = this.workspace.canvasHeight
    if (top > canvasHeight - height - 20) {
      top = canvasHeight - height - 20
    }
    this.menuEl.style.top = `${top}px`
    this.canvas.wrapperEl.appendChild(this.menuEl)
    this.bindMenuEvent()
    setTimeout(() => {
      this.menuEl.style.opacity = '1'
      this.menuEl.style.pointerEvents = 'auto'
      this.menuEl.style.transform = 'scale(1)'
    })
  }
  
  removeMenu () {
    if (this.menuEl) {
      this.canvas.wrapperEl.removeChild(this.menuEl)
      this.unBindMenuEvent()
      this.menuEl = null
      this.object = null
      this.objectBoundingRect = null
    }
  }
  
  getMenu (e) {
    let object = null
    const activeObject = this.canvas.getActiveObject()
    if (activeObject) {
      object = activeObject
    } else {
      object = e.target
      if (object && object.id !== 'workspace') {
        this.canvas.setActiveObject(object)
      }
    }
    if (!object) return
    return createMenu({
      activeObject: object,
      canvas: this.canvas,
      workspace: this.workspace
    })
  }
  
  menuClick (e) {
    e = e || window.event
    const el = e.srcElement || e.target
    if (!el) return
    const id = el.getAttribute('data-id')
    if (!id || id === 'undefined') return
    const func = getMenuFunc(this.workspace, id)
    func?.()
    this.removeMenu()
  }
  
  bindMenuEvent () {
    this.menuEl.addEventListener('click', (e) => this.menuClick(e), true)
  }
  
  unBindMenuEvent () {
    this.menuEl.removeEventListener('click', (e) => this.menuClick(e), true)
  }
}

export default Menu
