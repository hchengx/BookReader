import Epub from 'epubjs'
import type { NavItem } from 'epubjs/types/navigation'
import type Book from 'epubjs/types/book'
import type Navigation from 'epubjs/types/navigation'
import type { DisplayedLocation, Location } from 'epubjs/types/rendition'

export default class EBook {
  epub: Book | null
  element: string
  toc: NavItem[]
  marklocation: Location | null
  constructor(element: string) {
    this.epub = null
    this.element = element
    this.toc = []
    this.init()
    this.marklocation = null
  }

  init() {
    this.epub = Epub()
    this.epub.loaded.navigation.then((toc: Navigation) => {
      this.toc = JSON.parse(
        JSON.stringify(toc.toc).replace(/"subitems"/g, '"children"')
      )
    })
  }

  reset() {
    ;(this.epub as Book).destroy()
    this.init()
  }

  openFile() {
    const input = document.createElement('input')
    input.type = 'file'
    input.setAttribute('accept', 'application/epub+zip')
    input.style.display = 'none'
    input.onchange = () => {
      const reader = new FileReader()
      reader.onload = () => {
        console.log(this.epub)
        this.openEpub(reader.result as ArrayBuffer)
      }
      if (input.files !== null && input.files[0]) {
        reader.readAsArrayBuffer(input.files[0])
      }
    }
    document.body.appendChild(input)
    input.click()
  }

  async openEpub(data: ArrayBuffer) {
    if (this.epub?.isOpen) {
      this.reset()
    }
    this.epub?.open(data, 'binary')
    this.renderTo(this.element)
    // print the epub book catalogue
    const toc = await this.epub?.loaded.navigation
    this.toc = JSON.parse(
      toc ? JSON.stringify(toc.toc).replace(/"subitems"/g, '"children"') : '[]'
    )
    // this.toc.forEach((item) => {
    //   console.log(item.label)
    // })
    this.epub?.rendition.on('click', (e: any) => {
      const elementClientRect = document
        .querySelector('#reader-view')
        ?.getBoundingClientRect()
      const elementWidth = elementClientRect?.width
      const mousePosition =
        document.body.clientWidth + e.screenX - elementClientRect!.left
      if (mousePosition > elementWidth! / 2) {
        console.log('right')
        this.epub?.rendition.next()
      } else {
        console.log('left')
        this.epub?.rendition.prev()
      }
    })
  }

  renderTo(element: string) {
    this.epub
      ?.renderTo(element, {
        width: '100%',
        height: '100%',
        flow: 'paginated', // scroll on chapter
        // flow: 'scrolled',
        manager: 'continuous', // behavior
        // snap: true,
      })
      .display()
  }

  bookmark() {
    this.marklocation =
      this.epub?.rendition.currentLocation() as any as Location
    console.log(this.marklocation)
    console.log(this.marklocation?.start.cfi)
  }

  gotomark() {
    this.epub?.rendition.display(this.marklocation?.start.cfi)
  }
  nextchapter() {
    this.epub?.rendition.next()
  }

  prevchapter() {
    this.epub?.rendition.prev()
  }
}
