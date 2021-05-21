import { FormGroup } from "@angular/forms";
import { IResult } from "./generic.interfaces";
import { GenericServices } from "./generic.services";


export class GenericClass<TModelo> {

    api: string = "";

    constructor(public genericService: GenericServices) { }

    public async onEditar(id: string, formulario: FormGroup): Promise<boolean> {
        var response = await this.genericService.apiServices.get<IResult<TModelo>>(this.api + "/buscarum/" + id);

        if (!response.success) {
            this.genericService.widgetsServices.criaDialog("Error", response.message);
            return;
        };

        formulario.reset();

        formulario.patchValue(response.data);

        return true;
    };

    public async onDeletar(id: string, formulario: FormGroup): Promise<boolean> {
        var response = await this.genericService.apiServices.get<IResult<string>>(this.api + "/delete/" + id);

        if (!response.success) {
            this.genericService.widgetsServices.criaDialog("Error", response.message);
            return;
        };

        this.genericService.widgetsServices.criaDialog("Sucesso", response.data);

        return true;
    };

    public async onSalvar(formulario: FormGroup): Promise<boolean> {
        var response = await this.genericService.apiServices.post<IResult<TModelo>>(this.api + "/salvar", formulario.value);

        if (!response.success) {
            this.genericService.widgetsServices.criaDialog("Error", "Ocorreu um erro ao tentar excluir, contate o administrador!");
            return false;
        };

        formulario.reset();

        formulario.patchValue(response.data);

        return true;
    };

    public filterDataTable(query: any[]) { return this.genericService.apiServices.post<IResult<TModelo[]>>(this.api + "/datatable/filter", query); };

}
