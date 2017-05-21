package net.hr.in2.hgss.hgss.mainScreen.newAction;

import android.content.Intent;
import android.net.Uri;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import net.hr.in2.hgss.hgss.R;
import net.hr.in2.hgss.hgss.model.Person;

import java.util.List;

public class MyPersonsRecyclerViewAdapter extends RecyclerView.Adapter<MyPersonsRecyclerViewAdapter.ViewHolder> {

    private final List<Person> mValues;

    public MyPersonsRecyclerViewAdapter(List<Person> persons) {
        mValues = persons;
    }

    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.fragment_person, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, final int position) {
        holder.mItem = mValues.get(position);
        holder.mNameView.setText(mValues.get(position).getFirstname() + " " + mValues.get(position).getLastname());
        holder.mPhoneView.setText(mValues.get(position).getPhoneNumber());

        holder.mNameView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Intent.ACTION_DIAL);
                intent.setData(Uri.parse("tel:" + holder.mPhoneView.getText().toString()));
                v.getContext().startActivity(intent);
            }
        });
    }

    @Override
    public int getItemCount() {
        return mValues.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        public final View mView;
        public final TextView mNameView;
        public final TextView mPhoneView;
        public Person mItem;

        public ViewHolder(View view) {
            super(view);
            mView = view;
            mNameView = (TextView) view.findViewById(R.id.contact_name);
            mPhoneView = (TextView) view.findViewById(R.id.phone_number);
        }

        @Override
        public String toString() {
            return super.toString() + " '" + mNameView.getText() + "'";
        }
    }
}
