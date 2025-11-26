import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFurnitureList } from './admin-furniture-list';

describe('AdminFurnitureList', () => {
  let component: AdminFurnitureList;
  let fixture: ComponentFixture<AdminFurnitureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFurnitureList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFurnitureList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
