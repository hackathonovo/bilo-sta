package net.hr.in2.hgss.hgss.model;

/**
 * Created by luka0 on 19.5.2017..
 */

public class Tip {

    private String title;
    private String text;

    public Tip(String title, String text) {
        this.title = title;
        this.text = text;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
