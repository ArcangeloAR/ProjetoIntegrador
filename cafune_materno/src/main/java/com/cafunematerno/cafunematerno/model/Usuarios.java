package com.cafunematerno.cafunematerno.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "tb_usuarios")
public class Usuarios {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long idUsuario;
	
	@NotBlank
	@Size(min = 5, max = 70, message = "Entre 5 e 70 caracteres.")
	private String nomeCompleto;
	
	@NotBlank
	@Size(min = 10, max = 50, message = "Entre 10 e 50 caracteres.")
	private String email;
	
	@NotBlank
	@Size(min = 8, max = 100, message = "Entre 8 e 100 caracteres.")
	private String senha;
	
	
	@ManyToMany
	@JoinTable(
			name = "tb_integra",
			joinColumns = @JoinColumn (name = "fk_usuario"),
			inverseJoinColumns = @JoinColumn (name = "fk_grupo"))
	private List<Grupos> listaGrupos = new ArrayList<>();	
	
	
	public List<Grupos> getListaGrupos() {
		return listaGrupos;
	}

	public void setListaGrupos(List<Grupos> listaGrupos) {
		this.listaGrupos = listaGrupos;
	}

	public Long getIdUsuario() {
		return idUsuario;
	}

	public void setIdUsuario(Long idUsuario) {
		this.idUsuario = idUsuario;
	}

	public String getNomeCompleto() {
		return nomeCompleto;
	}

	public void setNomeCompleto(String nomeCompleto) {
		this.nomeCompleto = nomeCompleto;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getSenha() {
		return senha;
	}

	public void setSenha(String senha) {
		this.senha = senha;
	}
	
}
