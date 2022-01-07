import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {ListService} from "../../app/shared/services/list.service";
import {of} from "rxjs";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


const mockedListService = {
  getPositionsList() {
    return of();
  }
};
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let listService: ListService;

  const mockedData = {
    "data": [
      {
        "id": 1,
        "name": "position 1",
        "technology": "JavaScript",
        "candidates": 5,
        "pdf": '',
        "category": 3
      },
      {
        "id": 2,
        "name": "position 2",
        "technology": "PHP",
        "candidates": 3,
        "pdf": '',
        "category": 3
      },
      {
        "id": 3,
        "name": "position 3",
        "technology": "Python",
        "candidates": 5,
        "pdf": '',
        "category": 1
      },
      {
        "id": 4,
        "name": "position 4",
        "technology": "Rust",
        "candidates": 8,
        "pdf": '',
        "category": 2
      },
      {
        "id": 5,
        "name": "position 5",
        "technology": "PHP",
        "candidates": 12,
        "pdf": '',
        "category": 3
      },
      {
        "id": 6,
        "name": "position 6",
        "technology": "PHP",
        "candidates": 15,
        "pdf": '',
        "category": 1
      },
      {
        "id": 7,
        "name": "position 7",
        "technology": "JavaScript",
        "candidates": 1,
        "pdf": '',
        "category": 1
      },
      {
        "id": 8,
        "name": "position 8",
        "technology": "JavaScript",
        "candidates": 0,
        "pdf": '',
        "category": 1
      }
    ],
    "meta": {
      "error": 'error'
    }
  }


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        BrowserAnimationsModule
      ],
      declarations: [ ListComponent ],
      providers: [
        {provide: ListService, useValue: mockedListService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    listService = TestBed.inject(ListService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('on init component', () => {
    it('should group list by categories', () => {
      spyOn(listService, 'getPositionsList').and.returnValue(of(mockedData));
      component.arraySorting = jasmine.createSpy();
      component.ngOnInit();
      expect(component.positionsList.length).toBe(8);
      expect(component.newPositions.length).toBe(4);
      expect(component.activePositions.length).toBe(1);
      expect(component.nonActivePositions.length).toBe(3);
      expect(component.arraySorting).toHaveBeenCalledWith(
        [component.activePositions, component.nonActivePositions, component.newPositions],
        'id'
      );
    });
  });
  describe('arraySorting', () => {
    it('should sort arrays based on a number option', () => {
      const arrayToSort = [
        {
          "id": 2,
          "name": "position 2",
          "technology": "PHP",
          "candidates": 12,
          "pdf": '',
          "category": 3
        },
        {
          "id": 1,
          "name": "position 1",
          "technology": "JavaScript",
          "candidates": 3,
          "pdf": '',
          "category": 3
        },
        {
          "id": 5,
          "name": "position 5",
          "technology": "PHP",
          "candidates": 5,
          "pdf": '',
          "category": 3
        }
      ]
      const sortedArray = [
        {
          "id": 1,
          "name": "position 1",
          "technology": "JavaScript",
          "candidates": 3,
          "pdf": '',
          "category": 3
        },
        {
          "id": 5,
          "name": "position 5",
          "technology": "PHP",
          "candidates": 5,
          "pdf": '',
          "category": 3
        },
        {
          "id": 2,
          "name": "position 2",
          "technology": "PHP",
          "candidates": 12,
          "pdf": '',
          "category": 3
        }
      ]
      component.arraySorting([arrayToSort], 'candidates');
      expect(arrayToSort).toEqual(sortedArray);
    });
    it('should sort arrays based on a string option', () => {
      const arrayToSort = [
        {
          "id": 2,
          "name": "position 2",
          "technology": "PHP",
          "candidates": 12,
          "pdf": '',
          "category": 3
        },
        {
          "id": 1,
          "name": "position 1",
          "technology": "JavaScript",
          "candidates": 3,
          "pdf": '',
          "category": 3
        },
        {
          "id": 5,
          "name": "position 5",
          "technology": "PHP",
          "candidates": 5,
          "pdf": '',
          "category": 3
        }
      ]
      const sortedArray = [
        {
          "id": 1,
          "name": "position 1",
          "technology": "JavaScript",
          "candidates": 3,
          "pdf": '',
          "category": 3
        },
        {
          "id": 2,
          "name": "position 2",
          "technology": "PHP",
          "candidates": 12,
          "pdf": '',
          "category": 3
        },
        {
          "id": 5,
          "name": "position 5",
          "technology": "PHP",
          "candidates": 5,
          "pdf": '',
          "category": 3
        }
      ]
      component.arraySorting([arrayToSort], 'name');
      expect(arrayToSort).toEqual(sortedArray);
    });
  });
});
