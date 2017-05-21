package net.hr.in2.hgss.hgss.model;

import java.util.List;

/**
 * Created by luka0 on 20.5.2017..
 */

class Station {

    private String name;
    private List<Double> coords;

    public Station(String name, List<Double> coords) {
        this.name = name;
        this.coords = coords;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Double> getCoords() {
        return coords;
    }

    public void setCoords(List<Double> coords) {
        this.coords = coords;
    }
}
