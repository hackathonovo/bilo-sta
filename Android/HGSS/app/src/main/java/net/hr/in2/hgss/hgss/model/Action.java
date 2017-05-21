package net.hr.in2.hgss.hgss.model;

import java.util.Date;
import java.util.List;

/**
 * Created by luka0 on 20.5.2017..
 */

public class Action {

    private Date datumStart;
    private Date datumFinish;
    private String title;
    private String details;
    private List<Person> persons;
    private List<Profession> professions;
    private Person leader;
    private List<Double> coords;
    private int personNumber;

    public Action() {
    }

    public Action(Date datumStart, Date datumFinish, String title, String details, List<Person> persons, List<Profession> professions, Person leader, List<Double> coords, int personNumber) {
        this.datumStart = datumStart;
        this.datumFinish = datumFinish;
        this.title = title;
        this.details = details;
        this.persons = persons;
        this.professions = professions;
        this.leader = leader;
        this.coords = coords;
        this.personNumber = personNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    public List<Person> getPersons() {
        return persons;
    }

    public void setPersons(List<Person> persons) {
        this.persons = persons;
    }

    public List<Profession> getProfessions() {
        return professions;
    }

    public void setProfessions(List<Profession> professions) {
        this.professions = professions;
    }

    public Person getLeader() {
        return leader;
    }

    public void setLeader(Person leader) {
        this.leader = leader;
    }

    public List<Double> getCoords() {
        return coords;
    }

    public void setCoords(List<Double> coords) {
        this.coords = coords;
    }

    public int getPersonNumber() {
        return personNumber;
    }

    public void setPersonNumber(int personNumber) {
        this.personNumber = personNumber;
    }

    public Date getDatumStart() {
        return datumStart;
    }

    public void setDatumStart(Date datumStart) {
        this.datumStart = datumStart;
    }

    public Date getDatumFinish() {
        return datumFinish;
    }

    public void setDatumFinish(Date datumFinish) {
        this.datumFinish = datumFinish;
    }
}
