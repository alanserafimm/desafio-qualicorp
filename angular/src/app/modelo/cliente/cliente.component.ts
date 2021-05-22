import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GenericControllers } from 'src/tools/controllers/generic.controllers';
import { GenericClass } from 'src/tools/services/generic.class';
import { IFormInicialize, IResult } from 'src/tools/services/generic.interfaces';
import { GenericServices } from 'src/tools/services/generic.services';
import { IDataTable } from 'src/tools/widgets/data-table/data-table.interfaces';
import { DataTableServices } from 'src/tools/widgets/data-table/data-table.services';
import { IColor, ISpinnerButton, IType } from 'src/tools/widgets/spinner-button/spinner-button.interfaces';
import { WidgetsServices } from 'src/tools/widgets/widgets.services';
import { isNullOrUndefined } from 'util';
import { APICliente, ICliente } from './cliente.interfaces';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent extends GenericClass<ICliente> implements OnInit {
  public api: string = this.genericService.getUrl(APICliente);

  clienteDataTable: IDataTable;
  clienteForm: FormGroup;

  btnSalver: ISpinnerButton;
  filterData: ICliente[];

  viewChange: boolean = true;
  edit: boolean = false;

  selected = new FormControl(0);


  constructor(public genericServices: GenericServices, private formBuilder: FormBuilder, public route: ActivatedRoute) { super(genericServices); }

  ngOnInit() {
    var resolver = this.route.snapshot.data["cliente"] as IFormInicialize;

    this.clienteDataTable = resolver.datatable;

    this.initForm();

    this.btnSalver = this.genericService.widgetsServices.criaSpinnerButton(() => { this.onSave(); }, "btnSalver", "Salvar", "send", IColor.Primary, IType.Submit);

    this.clienteDataTable.onClickNew = (boolean) => { this.onClickNew(); };
    this.clienteDataTable.onClickEdit = (id) => { this.onEdit(id); };
    this.clienteDataTable.onClickDelete = (id) => { this.onDelete(id); };
  }

  private initForm() {
    this.clienteForm = this.formBuilder.group({
      _id: [null],
      cpf: [null, Validators.required],
      nome: [null, Validators.required],
      email: [null, Validators.email]
    });
  };

  public onClickNew() {
    this.clienteForm.reset();
    this.edit = false;
    this.viewChange = false;
  }

  public async onSave() {
    if (this.clienteForm.invalid) return;

    this.btnSalver.start();

    setTimeout(async () => {

      if (!this.edit) {
        var verificarDuplicado = await this.genericService.apiServices.get<IResult<string>>(this.api + "/verificarduplicado/" + this.clienteForm.controls['cpf'].value)

        if (!verificarDuplicado.success) {
          this.btnSalver.stop();
          return this.genericService.widgetsServices.criaDialog("Atenção!", verificarDuplicado.message);
        };
      };

      await this.initSalvarCliente();

      this.btnSalver.stop();
    }, 300);
  };

  private async initSalvarCliente() {
    var response = await super.onSalvar(this.clienteForm);
    if (!isNullOrUndefined(response)) {
      this.genericService.widgetsServices.criaDialog("Sucesso!", "item foi adicionado/alterado!");

      this.refreshDataTable();
    };
  }

  public async onEdit(id: string) {
    var response = await super.onEditar(id, this.clienteForm);

    if (response) {
      this.edit = true;
      this.viewChange = false;
    };
  };

  public async onDelete(id: string) {
    var response = await super.onDeletar(id, this.clienteForm);

    if (response) this.refreshDataTable();
  };

  private async refreshDataTable() {
    var response = await this.filterDataTable([{}]);

    if (response.success) this.filterData = response.data;
  };

  public onClickLast() {
    this.refreshDataTable();
    this.viewChange = true;
  };

}
