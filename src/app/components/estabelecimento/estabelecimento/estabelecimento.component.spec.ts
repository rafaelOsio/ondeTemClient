import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstabelecimentoComponent } from './estabelecimento.component';

describe('EstabelecimentoComponent', () => {
  let component: EstabelecimentoComponent;
  let fixture: ComponentFixture<EstabelecimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstabelecimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstabelecimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
