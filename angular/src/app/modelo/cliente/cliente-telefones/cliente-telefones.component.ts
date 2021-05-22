import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
import { APIClienteTelefones, IClienteTelefones } from './cliente-telefones.interfaces';

@Component({
  selector: 'app-cliente-telefones',
  templateUrl: './cliente-telefones.component.html',
  styleUrls: ['./cliente-telefones.component.css']
})
export class ClienteTelefonesComponent extends GenericClass<IClienteTelefones> implements OnInit {
  public api: string = this.genericServices.getUrl(APIClienteTelefones);

  @Input() set id(value: string) {
    if (isNullOrUndefined(value)) return;

    this.clienteId = value;

    this.requestDataTable();
  };

  clienteId: string;

  clienteTelefonesDataTable: IDataTable;
  clienteTelefonesForm: FormGroup;

  btnSalvar: ISpinnerButton;
  filterData: IClienteTelefones[];
  edit: boolean = false;
  viewChange: boolean = true;

  constructor(public genericServices: GenericServices, private formBuilder: FormBuilder, public route: ActivatedRoute) { super(genericServices); }

  ngOnInit() {
    var resolver = this.route.snapshot.data["clientetelefones"] as IFormInicialize;

    this.clienteTelefonesDataTable = resolver.datatable;

    this.initForm();

    this.btnSalvar = this.genericServices.widgetsServices.criaSpinnerButton(() => { this.onSave(); }, "btnSalverTelefone", "Salvar", "send", IColor.Primary, IType.Button);

    this.clienteTelefonesDataTable.onClickNew = (boolean) => { this.onClickNew(); };
    this.clienteTelefonesDataTable.onClickEdit = (id) => { this.onEdit(id); };
    this.clienteTelefonesDataTable.onClickDelete = (id) => { this.onDelete(id); };
  }

  private initForm() {
    this.clienteTelefonesForm = this.formBuilder.group({
      _id: [null],
      clienteId: [null, Validators.required],
      numero: [null, [Validators.required]],
      prefixo: [null, Validators.required]
    });
  };

  public onClickNew() {
    this.clienteTelefonesForm.reset();
    this.edit = false;
    this.viewChange = false;
  }

  public async onSave() {
    this.clienteTelefonesForm.controls['clienteId'].setValue(this.clienteId);

    if (this.clienteTelefonesForm.invalid) return;

    this.btnSalvar.start();

    setTimeout(async () => {
      var response = await super.onSalvar(this.clienteTelefonesForm);

      if (!isNullOrUndefined(response)) {
        this.genericServices.widgetsServices.criaDialog("Sucesso!", "item foi adicionado/alterado!");

        this.requestDataTable();
      };
      this.btnSalvar.stop();
    }, 300);
  };

  public async onEdit(id: string) {
    var response = await super.onEditar(id, this.clienteTelefonesForm);

    if (response) {
      this.edit = true;
      this.viewChange = false;
    };
  };

  public async onDelete(id: string) {
    var response = await super.onDeletar(id, this.clienteTelefonesForm);

    if (response) this.requestDataTable();
  };

  public onClickLast() {
    this.requestDataTable();
    this.viewChange = true;
  };

  private async requestDataTable() {
    var response = await this.filterDataTable([{ clienteId: String(this.clienteId) }]);

    if (response.success) this.filterData = response.data;
  };

}
