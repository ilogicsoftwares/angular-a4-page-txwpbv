import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-paginated-view",
  templateUrl: "paginated-view.component.html",
  styleUrls: ["paginated-view.component.scss"]
})
export class PaginatedViewComponent implements AfterViewInit {
  @Input() pageSize: "A3" | "A4" = "A4";

  @ViewChild("paginatedView") paginatedView: ElementRef<HTMLDivElement>;

  @ViewChild("contentWrapper") contentWrapper: ElementRef<HTMLDivElement>;

  @ContentChildren("pageContent", { read: ElementRef }) elements: QueryList<
    ElementRef
  >;

  constructor() {}

  ngAfterViewInit(): void {
    this.updatePages();

    // when ever childs updated call the updatePagesfunction
    this.elements.changes.subscribe(el => {
      debugger;
      this.updatePages();
    });
  }

  updatePages(): void {
    // clear paginated view
    this.paginatedView.nativeElement.innerHTML = "";

    // get a new page and add it to the paginated view
    let page = this.getNewPage();
    this.paginatedView.nativeElement.appendChild(page);

    let lastEl: HTMLElement;
    // add content childrens to the page one by one
    this.elements.forEach(elRef => {
      const el = elRef.nativeElement;

      // if the content child height is larger than the size of the page
      // then do not add it to the page
      if (el.clientHeight > page.clientHeight) {
        return;
      }
      // add the child to the page
      page.appendChild(el);

      // after adding the child if the page scroll hight becomes larger than the page height
      // then get a new page and append the child to the  new page
      if (page.scrollHeight > page.clientHeight) {
        page = this.getNewPage();
        this.paginatedView.nativeElement.appendChild(page);
        page.appendChild(el);
      }
      lastEl = el;
    });

    //bring the element in to view port
    lastEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  getNewPage(): HTMLDivElement {
    const page = document.createElement("div");
    page.classList.add("page");
    page.classList.add(this.pageSize);
    return page;
  }
}
