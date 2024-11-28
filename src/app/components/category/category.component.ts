import { Component } from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  //TODO implement getting doctors dinamically
  //TODO try to fix the scrollbar
  //TODO fix header authorize/register/username spacing

  people = [
    { name: 'John', age: 25, city: 'New York', photo: 'photo.png', rating: '* * * * *' },
    { name: 'Jane', age: 30, city: 'London', photo: 'photo.png', rating: '* * *'  },
    { name: 'Smith', age: 35, city: 'Sydney', photo: 'photo.png', rating: '* * * *'  },
    { name: 'Mary', age: 27, city: 'Chicago', photo: 'photo.png', rating: '* *'  },
    { name: 'John', age: 25, city: 'New York', photo: 'photo.png', rating: '* * * * *' },
    { name: 'Jane', age: 30, city: 'London', photo: 'photo.png', rating: '* * *'  },
    { name: 'Smith', age: 35, city: 'Sydney', photo: 'photo.png', rating: '* * * *'  },
    { name: 'Mary', age: 27, city: 'Chicago', photo: 'photo.png', rating: '* *'  },
    { name: 'John', age: 25, city: 'New York', photo: 'photo.png', rating: '* * * * *' },
    { name: 'Jane', age: 30, city: 'London', photo: 'photo.png', rating: '* * *'  },
    { name: 'Smith', age: 35, city: 'Sydney', photo: 'photo.png', rating: '* * * *'  },
    { name: 'Mary', age: 27, city: 'Chicago', photo: 'photo.png', rating: '* *'  },
    { name: 'John', age: 25, city: 'New York', photo: 'photo.png', rating: '* * * * *' },
    { name: 'Jane', age: 30, city: 'London', photo: 'photo.png', rating: '* * *'  },
    { name: 'Smith', age: 35, city: 'Sydney', photo: 'photo.png', rating: '* * * *'  },
    { name: 'Mary', age: 27, city: 'Chicago', photo: 'photo.png', rating: '* *'  }
  ];
}
