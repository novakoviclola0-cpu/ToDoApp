package com.example.todoapp.model;

import jakarta.persistence.*; //import sve klase i anotacije koje su deo Jakarta Persistence API biblioteke.

import java.util.Date;

@Entity //klasa predszavlja tabelu u mysql
@Table(name = "Naloga")

public class Naloga {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int nalogaID;
    private String ime;
    private String opis;
    private boolean opravljeno;
    private String rok;
    private boolean pomembno;

    public Naloga() {

    }


    public int getNalogaID() {
        return nalogaID;
    }

    public void setNalogaID(int nalogaID) {
        this.nalogaID = nalogaID;
    }

    public String getIme() {
        return ime;
    }

    public void setIme(String ime) {
        this.ime = ime;
    }

    public String getOpis() {
        return opis;
    }

    public void setOpis(String opis) {
        this.opis = opis;
    }

    public boolean isOpravljeno() {
        return opravljeno;
    }

    public void setOpravljeno(boolean opravljeno) {
        this.opravljeno = opravljeno;
    }

    public String getRok() {
        return rok;
    }

    public void setRok(String rok) {
        this.rok = rok;
    }

    public boolean isPomembno() {
        return pomembno;
    }

    public void setPomembno(boolean pomembno) {
        this.pomembno = pomembno;
    }

    public Naloga(String ime, String opis, boolean opravljeno, String rok, boolean pomembno ) {
        this.ime = ime;
        this.opis = opis;
        this.opravljeno = opravljeno;
        this.rok = rok;
        this.pomembno = pomembno;
    }
}

