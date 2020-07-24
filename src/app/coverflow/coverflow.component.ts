import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-coverflow',
  templateUrl: './coverflow.component.html',
  styleUrls: ['./coverflow.component.scss'],
})
export class CoverflowComponent implements OnInit, AfterViewInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  galleryContainer;
  galleryControlsContainer;
  galleryControls;
  galleryItems;
  items = [
    {
      imagePath:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      imagePath:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      imagePath:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      imagePath:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      imagePath:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
    {
      imagePath:
        'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
    },
  ];
  ngOnInit(): void {}

  ngAfterViewInit() {
    console.log(this.items);
    this.galleryContainer = this.el.nativeElement.querySelector(
      '.gallery-container'
    );
    this.galleryControlsContainer = this.el.nativeElement.querySelector(
      '.gallery-controls'
    );
    this.galleryControls = ['previous', 'next'];
    this.galleryItems = this.el.nativeElement.querySelectorAll('.gallery-item');
    console.log(this.galleryItems);
    this.setControls();
    this.setNav();
    this.setInitialState();
    this.useControls();
    console.log(this.galleryContainer);
  }
  setInitialState() {
    this.galleryItems[0].classList.add('gallery-item-first');
    this.galleryItems[1].classList.add('gallery-item-previous');
    this.galleryItems[2].classList.add('gallery-item-selected');
    this.galleryItems[3].classList.add('gallery-item-next');
    this.galleryItems[4].classList.add('gallery-item-last');
    this.el.nativeElement.querySelector(
      '.gallery-nav'
    ).childNodes[0].className = 'gallery-nav-item gallery-item-first';
    this.el.nativeElement.querySelector(
      '.gallery-nav'
    ).childNodes[1].className = 'gallery-nav-item gallery-item-previous';
    this.el.nativeElement.querySelector(
      '.gallery-nav'
    ).childNodes[2].className = 'gallery-nav-item gallery-item-selected';
    this.el.nativeElement.querySelector(
      '.gallery-nav'
    ).childNodes[3].className = 'gallery-nav-item gallery-item-next';
    this.el.nativeElement.querySelector(
      '.gallery-nav'
    ).childNodes[4].className = 'gallery-nav-item gallery-item-last';
  }
  setCurrentState(target, selected, previous, next, first, last) {
    console.log(target, selected, previous, next, first, last);
    selected.forEach((el) => {
      el.classList.remove('gallery-item-selected');

      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-next');
      } else {
        el.classList.add('gallery-item-previous');
      }
    });

    previous.forEach((el) => {
      el.classList.remove('gallery-item-previous');

      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-selected');
      } else {
        el.classList.add('gallery-item-first');
      }
    });

    next.forEach((el) => {
      el.classList.remove('gallery-item-next');

      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-last');
      } else {
        el.classList.add('gallery-item-selected');
      }
    });

    first.forEach((el) => {
      el.classList.remove('gallery-item-first');

      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-previous');
      } else {
        el.classList.add('gallery-item-last');
      }
    });

    last.forEach((el) => {
      el.classList.remove('gallery-item-last');

      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-first');
      } else {
        el.classList.add('gallery-item-next');
      }
    });
  }
  setNav() {
    this.el.nativeElement
      .querySelector('.gallery-nav-container')
      .appendChild(this.renderer.createElement('ul')).className = 'gallery-nav';

    this.galleryItems.forEach((item) => {
      const nav = this.el.nativeElement.querySelector('.gallery-nav');
      nav.appendChild(this.renderer.createElement('li'));
    });
  }
  setControls() {
    this.galleryControls.forEach((control) => {
      this.galleryControlsContainer.appendChild(
        this.renderer.createElement('button')
      ).className = `gallery-controls-${control}`;
    });

    !!this.galleryControlsContainer.childNodes[0]
      ? (this.galleryControlsContainer.childNodes[0].innerHTML = this.galleryControls[0])
      : null;
    !!this.galleryControlsContainer.childNodes[1]
      ? (this.galleryControlsContainer.childNodes[1].innerHTML = this.galleryControls[1])
      : null;
  }

  // Add a click event listener to trigger setCurrentState method to rearrange carousel
  useControls() {
    const triggers = [...this.galleryControlsContainer.childNodes];
    console.log(triggers);
    const mouseEvents = [...this.galleryContainer.childNodes];
    // mouseEvents.forEach((control) => {
    //   control.addEventListener('mousedown', () => {
    //     const target = control;
    //     console.log(target);
    //     const selectedItem = this.el.nativeElement.querySelectorAll(
    //       '.gallery-item-selected'
    //     );
    //     const previousSelectedItem = this.el.nativeElement.querySelectorAll(
    //       '.gallery-item-previous'
    //     );
    //     const nextSelectedItem = this.el.nativeElement.querySelectorAll(
    //       '.gallery-item-next'
    //     );
    //     const firstCarouselItem = this.el.nativeElement.querySelectorAll(
    //       '.gallery-item-first'
    //     );
    //     const lastCarouselItem = this.el.nativeElement.querySelectorAll(
    //       '.gallery-item-last'
    //     );

    //     this.setCurrentState(
    //       target,
    //       selectedItem,
    //       previousSelectedItem,
    //       nextSelectedItem,
    //       firstCarouselItem,
    //       lastCarouselItem
    //     );
    //   });
    // });
    console.log(mouseEvents);
    triggers.forEach((control) => {
      control.addEventListener('click', () => {
        const target = control;
        console.log(target);
        const selectedItem = this.el.nativeElement.querySelectorAll(
          '.gallery-item-selected'
        );
        const previousSelectedItem = this.el.nativeElement.querySelectorAll(
          '.gallery-item-previous'
        );
        const nextSelectedItem = this.el.nativeElement.querySelectorAll(
          '.gallery-item-next'
        );
        const firstCarouselItem = this.el.nativeElement.querySelectorAll(
          '.gallery-item-first'
        );
        const lastCarouselItem = this.el.nativeElement.querySelectorAll(
          '.gallery-item-last'
        );

        this.setCurrentState(
          target,
          selectedItem,
          previousSelectedItem,
          nextSelectedItem,
          firstCarouselItem,
          lastCarouselItem
        );
      });
    });
  }
}
