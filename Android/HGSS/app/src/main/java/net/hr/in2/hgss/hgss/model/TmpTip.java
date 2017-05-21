package net.hr.in2.hgss.hgss.model;

public class TmpTip {

    private String title;
    private int id;

    public TmpTip() {
    }

    public TmpTip(String title, int id) {
        this.title = title;
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
