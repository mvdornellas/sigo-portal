import { Router } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { CompanyModel } from '../../services/company.service';


const STANDARDS = [{id: 'NR1', name: 'DISPOSIÇÕES GERAIS'},
{id: 'NR2', name: 'INSPEÇÃO PRÉVIA (REVOGADA)'},
{id: 'NR3', name: 'EMBARGO OU INTERDIÇÃO'},
{id: 'NR4', name: 'SERVIÇOS ESPECIALIZADOS EM ENGENHARIA DE SEGURANÇA E EM MEDICINA DO TRABALHO'},
{id: 'NR5', name: 'COMISSÃO INTERNA DE PREVENÇÃO DE ACIDENTES'},
{id: 'NR6', name: 'EQUIPAMENTO DE PROTEÇÃO INDIVIDUAL EPI'},
{id: 'NR7', name: 'PROGRAMA DE CONTROLE MÉDICO DE SAÚDE OCUPACIONAL'},
{id: 'NR8', name: 'EDIFICAÇÕES'},
{id: 'NR9', name: 'PROGRAMA DE PREVENÇÃO DE RISCOS AMBIENTAIS'},
{id: 'NR10', name: 'SEGURANÇA EM INSTALAÇÕES E SERVIÇOS EM ELETRICIDADE'},
{id: 'NR11', name: 'TRANSPORTE, MOVIMENTAÇÃO, ARMAZENAGEM E MANUSEIO DE MATERIAIS'},
{id: 'NR12', name: 'SEGURANÇA NO TRABALHO EM MÁQUINAS E EQUIPAMENTOS'},
{id: 'NR13', name: 'CALDEIRAS, VASOS DE PRESSÃO E TUBULAÇÕES E TANQUES METÁLICOS DE ARMAZENAMENTO'},
{id: 'NR14', name: 'FORNOS'},
{id: 'NR15', name: 'ATIVIDADES E OPERAÇÕES INSALUBRES'},
{id: 'NR16', name: 'ATIVIDADES E OPERAÇÕES PERIGOSAS'},
{id: 'NR17', name: 'ERGONOMIA'},
{id: 'NR18', name: 'CONDIÇÕES E MEIO AMBIENTE DE TRABALHO NA INDÚSTRIA DA CONSTRUÇÃO'},
{id: 'NR19', name: 'EXPLOSIVOS'},
{id: 'NR20', name: 'SEGURANÇA E SAÚDE NO TRABALHO COM INFLAMÁVEIS E COMBUSTÍVEIS'},
{id: 'NR21', name: 'TRABALHOS A CÉU ABERTO'},
{id: 'NR22', name: 'SEGURANÇA E SAÚDE OCUPACIONAL NA MINERAÇÃO'},
{id: 'NR23', name: 'PROTEÇÃO CONTRA INCÊNDIOS'},
{id: 'NR24', name: 'CONDIÇÕES SANITÁRIAS E DE CONFORTO NOS LOCAIS DE TRABALHO'},
{id: 'NR25', name: 'RESÍDUOS INDUSTRIAIS'},
{id: 'NR26', name: 'SINALIZAÇÃO DE SEGURANÇA'},
{id: 'NR27', name: 'REGISTRO PROFISSIONAL DO TÉCNICO DE SEGURANÇA DO TRABALHO (REVOGADA)'},
{id: 'NR28', name: 'FISCALIZAÇÃO E PENALIDADES'},
{id: 'NR29', name: 'NORMA REGULAMENTADORA DE SEGURANÇA E SAÚDE NO TRABALHO PORTUÁRIO'},
{id: 'NR30', name: 'SEGURANÇA E SAÚDE NO TRABALHO AQUAVIÁRIO'},
{id: 'NR31', name: 'SEGURANÇA E SAÚDE NO TRABALHO NA AGRICULTURA, PECUÁRIA SILVICULTURA, EXPLORAÇÃO FLORESTAL E AQUICULTURA'},
{id: 'NR32', name: 'SEGURANÇA E SAÚDE NO TRABALHO EM SERVIÇOS DE SAÚDE'},
{id: 'NR33', name: 'SEGURANÇA E SAÚDE NOS TRABALHOS EM ESPAÇOS CONFINADOS'},
{id: 'NR34', name: 'CONDIÇÕES E MEIO AMBIENTE DE TRABALHO NA INDÚSTRIA DA CONSTRUÇÃO, REPARAÇÃO E DESMONTE NAVAL'},
{id: 'NR35', name: 'TRABALHO EM ALTURA'},
{id: 'NR36', name: 'SEGURANÇA E SAÚDE NO TRABALHO EM EMPRESAS DE ABATE E PROCESSAMENTO DE CARNES E DERIVADOS'},
{id: 'NR37', name: 'SEGURANÇA E SAÚDE EM PLATAFORMAS DE PETRÓLEO'}];


@Component({
  selector: 'app-add-company',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class CompanyAddComponent implements OnInit {
  standards = STANDARDS;
  isLinear = false;
  companyFormGroup: FormGroup;
  standardFormGroup: FormGroup;
  hireFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private companyService: CompanyService, private router: Router) {}

  ngOnInit(): void {
    this.companyFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      cnpj: ['', Validators.required]
    });
    this.standardFormGroup = this.formBuilder.group({
      standards: ['', Validators.required]
    });
    this.hireFormGroup = this.formBuilder.group({
      startHire: ['', Validators.required],
      endHire: ['', Validators.required],
    });
  }

  addCompany(): void{
    console.log(this.companyFormGroup.controls);
    const {name, cnpj, email} = this.companyFormGroup.controls;
    const {standards} = this.standardFormGroup.controls;
    const {startHire, endHire} = this.hireFormGroup.controls;

    if (this.companyService.add({
      name: name.value,
      cnpj: cnpj.value,
      email: email.value,
      standards: standards.value.map(value => STANDARDS.find(a => a.id === value)),
      startHire: startHire.value,
      endHire: endHire.value
    } as CompanyModel)){
      this.router.navigate(['/company']);
    }

  }

}
